const { findIdentifierIndex, updateReadFile } = require('./utils');
const readme = require('./templates/readme');

const generateRead = () => {
	const readmeRow = readme.split('\n');

	const updateIdentifier = (identifier, replaceText) => {
		const identifierIndex = findIdentifierIndex(readmeRow, identifier);
		if (!readmeRow[identifierIndex]) {
			return;
		}
		readmeRow[identifierIndex] = readmeRow[identifierIndex].replace(
			`<#${identifier}>`,
			replaceText
		)
	};

	const identifierToUpdate = {
		day_defore_new_years: () => {},
		my_self: () => {},
		today_date: () => {},
		bot_sign: () => {}
	};

	Object.entries(identifierToUpdate).forEach(([key, value]) => {
		updateIdentifier(key, value)
	});

	return readmeRow.join('\n');
};

const main = () => {
	const readme = generateRead();
	console.log(readme);

	updateReadFile(readme);
};

main();