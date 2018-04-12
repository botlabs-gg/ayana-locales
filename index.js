'use strict';

const pkg = require('./package.json');

const fs = require('fs');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

let locales = {};
let settings = {};
let stats = { count: {}, percentages: {} };

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

const loadSettings = async () => {
	const dirList = await readdir(__dirname);
	const loadingSettings = {};

	for (const folder of dirList) {
		const settingsFile = `${__dirname}/${folder}/settings.json`;
		if (fs.existsSync(settingsFile)) {
			const loaded = await readFile(settingsFile, { encoding: 'utf8' });
			loadingSettings[folder] = JSON.parse(loaded);
		}
	}

	settings = loadingSettings;
}

const loadComponent = async (component, loadOn) => {
	if (!component) return;
	if (!pkg || !pkg.config || !pkg.config.components || !pkg.config.components.includes(component)) return;

	if (Object.keys(settings).length === 0) await loadSettings();
	
	const dirList = await readdir(__dirname);

	for (const folder of dirList) {
		const componentFile = `${__dirname}/${folder}/${component}.json`;
		if (fs.existsSync(componentFile) && settings[folder]) {
			if (settings[folder].enabled !== 'true') continue;

			const componentData = await readFile(componentFile, { encoding: 'utf8' });

			if (!loadOn[folder]) loadOn[folder] = {};
			loadOn[folder][component] = JSON.parse(componentData);
		}
	}
}

class Locales {

	static async load(components = []) {
		if (components.length === 0) return;

		const loadingLocales = {};
		const loadingStats = { count: {}, percentages: {} };

		for (const component of components) {
			await loadComponent(component, loadingLocales);
		}

		const baseCount = countRecursive(loadingLocales['en_US']);
		loadingStats.count['en_US'] = baseCount;
		loadingStats.percentages['en_US'] = '100.00';

		for (const locale of Object.keys(loadingLocales))  {
			if (locale === 'en_US') continue;
			const count = countRecursive(loadingLocales[locale]);
			const percentage = (count / baseCount) * 100;

			loadingStats.count[locale] = count;
			loadingStats.percentages[locale] = percentage.toFixed(2);
		}

		locales = loadingLocales;
		stats = loadingStats;

		return locales;
	}

	static get() {
		return locales;
	}

	static list() {
		return Object.keys(locales);
	}

	static settings() {
		return settings;
	}

	static stats() {
		return stats;
	}

	static translate(locale, key, replacements) {
		let current = locales[locale];
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
