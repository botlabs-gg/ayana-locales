'use strict';

const fs = require('fs');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

let locales = {};
let initialized = false;

class Locales {

	static async load() {
		if (initialized) return locales;
		locales = {};

		const dirList = await readdir(__dirname);

		for (const file of dirList) {
			const localeFile = `${__dirname}/${file}/strings.json`;
			if (fs.existsSync(localeFile)) {
				const data = await readFile(localeFile, { encoding: 'utf8' });
				locales[file] = JSON.parse(data);
			}
		}

		initialized = true;
		return locales;
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
