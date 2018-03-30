'use strict';

const fs = require('fs');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

let locales = null;

class Locales {

	static async load() {
		if (locales) return locales;
		locales = {};

		const dirList = await readdir('./');

		for (const file of dirList) {
			const localeFile = `./${file}/strings.json`;
			if (fs.existsSync(localeFile)) {
				const data = await readFile(localeFile, { encoding: 'utf8' });
				locales[file] = JSON.parse(data);
				console.log(locales[file]);
			}
		}

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
