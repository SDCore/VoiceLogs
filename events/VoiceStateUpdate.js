const { client } = require("../VoiceLogs.js");
const { DateTime } = require("luxon");
const log = require("../logList.json");
const chalk = require("chalk");
const emotes = require("../emotes.json");

client.on("voiceStateUpdate", (oldState, newState) => {
	const time = Math.floor(DateTime.local().toMillis() / 1000);

	if (oldState.channel != null) {
		if (
			log[oldState.channel.parent.id] == null ||
			log[oldState.channel.parent.id] == "undefined"
		)
			return console.log(
				chalk`{red.bold > Could not log voice state update because it's category is not in the log list.}`
			);
	}

	if (newState.channel != null) {
		if (
			log[newState.channel.parent.id] == null ||
			log[newState.channel.parent.id] == "undefined"
		)
			return console.log(
				chalk`{red.bold > Could not log voice state update because it's category is not in the log list.}`
			);
	}

	if (oldState.channelId === null) {
		// User Joins VC
		console.log(
			chalk`{green > User ${newState.member.user.username}#${newState.member.user.discriminator} Joined VC #${newState.channel.name}.}`
		);

		var voice = `<t:${time}:f> :microphone2: ${emotes.Join} <@${newState.member.id}> (**${newState.member.user.username}#${newState.member.user.discriminator}**, \`${newState.member.id}\`) joined <#${newState.channel.id}> (**${newState.channel.id}**, \`${newState.channel.id}\`)`;
	} else if (newState.channelId === null) {
		// User Leaves VC
		console.log(
			chalk`{red > User ${oldState.member.user.username}#${oldState.member.user.discriminator} Left VC #${oldState.channel.name}.}`
		);

		var voice = `<t:${time}:f> :microphone2: ${emotes.Leave} <@${oldState.member.id}> (**${oldState.member.user.username}#${oldState.member.user.discriminator}**, \`${oldState.member.id}\`) joined <#${oldState.channel.id}> (**${oldState.channel.id}**, \`${oldState.channel.id}\`)`;
	} else if (oldState.channelId != newState.channelId) {
		// User Moves VC
		console.log(
			chalk`{yellow > User ${oldState.member.user.username}#${oldState.member.user.discriminator} Moved From #${oldState.channel.name} To #${newState.channel.name}.}`
		);

		var voice = `<t:${time}:f> :microphone2: ${emotes.Move} <@${oldState.member.id}> (**${oldState.member.user.username}#${oldState.member.user.discriminator}**, \`${oldState.member.id}\`) Move From <#${oldState.channel.id}> (**${oldState.channel.id}**, \`${oldState.channel.id}\`) To <#${newState.channel.id}> (**${newState.channel.id}**, \`${newState.channel.id}\`)`;
	}

	if (voice == null)
		return console.log(
			chalk`{grey.bold > Uncaught voice state change, ignoring.}`
		);

	if (!oldState.channel) {
		client.channels.cache
			.get(log[newState.channel.parent.id])
			.send({ content: voice });
	} else {
		client.channels.cache
			.get(log[oldState.channel.parent.id])
			.send({ content: voice });
	}
});
