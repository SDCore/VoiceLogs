const chalk = require('chalk');
const { ActivityType } = require('discord.js');
const { client } = require('../../VoiceLogs.js');

client.once('ready', client => {
	console.log(chalk.green(`${chalk.bold('[BOT]')} ${client.user.username} is Online`));

	client.user.setPresence({
		activities: [
			{
				type: ActivityType.Playing,
				name: `Apex Legends`,
			},
		],
	});
});
