const chalk = require('chalk');
const { client } = require('../VoiceLogs.js');

client.once('ready', client => {
	console.log(chalk.green(`${chalk.bold('[BOT]')} ${client.user.username} is Online.`));
});
