const chalk = require('chalk');
const { glob } = require('glob');
const { promisify } = require('util');

const globPromise = promisify(glob);

module.exports = async client => {
	// Event handler
	console.log(chalk.yellow(`${chalk.bold('[BOT]')} Loading Event Handler...`));

	const events = await globPromise(`${process.cwd()}/events/*.js`);
	events.map(value => require(value));

	console.log(chalk.green(`${chalk.bold('[BOT]')} Successfully Loaded Event Handler`));
};
