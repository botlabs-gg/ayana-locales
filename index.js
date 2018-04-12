'use strict';

const fs = require('fs');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

const countRecursive = (current) => {
	const keys = Object.keys(current);
	let count = 0;
	for (const key of keys) {
		const obj = current[key];
		if (typeof obj === 'string') count++;
		else count += countRecursive(obj);
	}
	return count;
}

let locales = {};
let stats = { count: {}, percentages: {} };

class Locales {

	static async load() {
		locales = {};

		const dirList = await readdir(__dirname);

		for (const file of dirList) {
			const settingsFile = `${__dirname}/${file}/settings.json`;
			const localeFile = `${__dirname}/${file}/fuse.json`;
			if (fs.existsSync(localeFile) && fs.existsSync(settingsFile)) {
				const settings = await readFile(settingsFile, { encoding: 'utf8' });
				const parsedSettings = JSON.parse(settings);
				if (parsedSettings.enabled !== 'true') continue;

				const locale = await readFile(localeFile, { encoding: 'utf8' });

				locales[file] = {};
				locales[file].settings = parsedSettings;
				locales[file].locale = JSON.parse(locale);
			}
		}

		stats = { count: {}, percentages: {} };

		const baseCount = countRecursive(locales['en_US'].locale);
		stats.count['en_US'] = baseCount;
		stats.percentages['en_US'] = '100.00';

		for (const locale of Object.keys(locales))  {
			if (locale === 'en_US') continue;
			const count = countRecursive(locales[locale].locale);
			const percentage = (count / baseCount) * 100;

			stats.count[locale] = count;
			stats.percentages[locale] = percentage.toFixed(2);
		}

		return locales;
	}

	static get() {
		return locales;
	}

	static list() {
		return Object.keys(locales);
	}

	static stats() {
		return stats;
	}

	static translate(locale, key, replacements) {
		let current = locales[locale] ? locales[locale].locale : null;
		if (!current) return null;

		const tokenized = key.split('.');
		for (const token of tokenized) {
			current = current[token];
			if (current == null) return null;
		}

		if (typeof current !== 'string') return null;

		if (replacements) {
			const keys = Object.keys(replacements);
			for (const k of keys) {
				current = current.replace(new RegExp(`{{${k}}}`, 'g'), replacements[k]);
			}
		}

		return current;
	}

}

module.exports = Locales;
