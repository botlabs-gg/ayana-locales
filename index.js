'use strict';

const fs = require('fs');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

let locales = {};

class Locales {

	static async load() {
		locales = {};

		const dirList = await readdir(__dirname);

		for (const file of dirList) {
			const settingsFile = `${__dirname}/${file}/settings.json`;
			const localeFile = `${__dirname}/${file}/strings.json`;
			if (fs.existsSync(localeFile) && fs.existsSync(settingsFile)) {
				const settings = await readFile(settingsFile, { encoding: 'utf8' });
				const locale = await readFile(localeFile, { encoding: 'utf8' });

				locales[file] = {};
				locales[file].settings = JSON.parse(settings);
				locales[file].locale = JSON.parse(locale);
			}
		}

		return locales;
	}

	static get() {
		return locales;
	}

	static list() {
		return Object.keys(locales);
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
