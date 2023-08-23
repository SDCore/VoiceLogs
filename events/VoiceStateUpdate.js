const { client } = require('../VoiceLogs.js');
const { DateTime } = require('luxon');
const log = require('../logList.json');
const chalk = require('chalk');
const emotes = require('../emotes.json');

client.on('voiceStateUpdate', (oldState, newState) => {
	const time = Math.floor(DateTime.local().toMillis() / 1000);

	if (oldState.channel != null) {
		if (log[oldState.channel.parent.id] == null || log[oldState.channel.parent.id] == 'undefined')
			return console.log(chalk.red(`${chalk.bold('[VOICE]')} Could not log voice state update because its category is not in the log list.`));
	}

	if (newState.channel != null) {
		if (log[newState.channel.parent.id] == null || log[newState.channel.parent.id] == 'undefined')
			return console.log(chalk.red(`${chalk.bold('[VOICE]')} Could not log voice state update because its category is not in the log list.`));
	}

	if (oldState.channelId === null) {
		// User Joins VC
		console.log(chalk.green(`${chalk.bold('[VOICE]')} User ${newState.member.user.username}#${newState.member.user.discriminator} Joined #${newState.channel.name}.`));

		var voice = `<t:${time}:f> :microphone2: ${emotes.Join} <@${newState.member.id}> (**${newState.member.user.username}#${newState.member.user.discriminator}**, \`${newState.member.id}\`) joined <#${newState.channel.id}> (**#${newState.channel.name}**, \`${newState.channel.id}\`)`;
	} else if (newState.channelId === null) {
		// User Leaves VC
		console.log(chalk.red(`${chalk.bold('[VOICE]')} User ${oldState.member.user.username}#${oldState.member.user.discriminator} Left #${oldState.channel.name}.`));

		var voice = `<t:${time}:f> :microphone2: ${emotes.Leave} <@${oldState.member.id}> (**${oldState.member.user.username}#${oldState.member.user.discriminator}**, \`${oldState.member.id}\`) left <#${oldState.channel.id}> (**#${oldState.channel.name}**, \`${oldState.channel.id}\`)`;
	} else if (oldState.channelId != newState.channelId) {
		// User Moves VC
		console.log(
			chalk.yellow(
				`${chalk.bold('[VOICE]')} User ${oldState.member.user.username}#${oldState.member.user.discriminator} Moved From #${oldState.channel.name} To #${
					newState.channel.name
				}.`,
			),
		);

		var voice = `<t:${time}:f> :microphone2: ${emotes.Move} <@${oldState.member.id}> (**${oldState.member.user.username}#${oldState.member.user.discriminator}**, \`${oldState.member.id}\`) Moved From <#${oldState.channel.id}> (**#${oldState.channel.name}**, \`${oldState.channel.id}\`) To <#${newState.channel.id}> (**#${newState.channel.name}**, \`${newState.channel.id}\`)`;
	}

	if (voice == null) return console.log(chalk.grey(`${chalk.bold('[VOICE]')} Uncaught voice state change, ignoring.`));

	if (!oldState.channel) {
		client.channels.cache.get(log[newState.channel.parent.id]).send({ content: voice });
	} else {
		client.channels.cache.get(log[oldState.channel.parent.id]).send({ content: voice });
	}
});
