const { findIdentifierIndex, updateReadFile } = require('./utils');
const readme = require('./templates/readme');

const msDay = 1000 * 60 * 60 * 24;
const today = new Date();

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
		day_before_new_years: () => {
			const nextYear = today.getFullYear() + 1;
			const nextYearDate = new Date(String(nextYear));

			const timeUntilNewYear = nextYearDate - today;
			const dayUntilNewYear = Math.round(timeUntilNewYear / msDay);

			return `**${dayUntilNewYear} day** before **${nextYear}** ✨`;
		},
		my_self: () => {
			return today.getDate() % 2 === 0 ?
				Math.floor(Math.random() * 2)
					? 'rocket 🚀'
					: 'ballon 🎈'
					: 'rocket ballon 🚀🎈';
		},
		today_date: () => {
			return today.toDateString();
		},
		hey: () => {
			return today.getDate() % 2 === 0 ?
				Math.floor(Math.random() * 2)
					? '👋'
					: '🤙'
				: '✍';
		},
		bot_sign: () => {
			const moods = {
				1: 'hate',
				2: 'wickedness',
				3: 'pleasure',
				4: 'wickedness',
				5: 'cruelty',
				6: 'horror',
				7: 'love',
			};
			const mood = moods[today.getDay()];
			return `🤖 This README.md has been updated with ${mood}, by Aecy ❤️`;
		}
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