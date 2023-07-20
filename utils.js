const { promises: fs } = require('fs');

module.exports = {
	findIdentifierIndex: (rows, identifier) => {
		return rows.findIndex((r) => Boolean(r.match(new RegExp(`<#${identifier}>`, 'i'))));
	},
	updateReadFile: (text) => {
		fs.writeFile('./README.md', text, () => console.log(text));
	},
}