const { client } = require("../VoiceLogs.js");
const chalk = require("chalk");

client.once("ready", (client) => {
	console.log(
		chalk`{yellow > Logging in to ${client.user.username}#${client.user.discriminator}...}`
	);
	console.log(
		chalk`{green > Successfully logged in to ${client.user.username}#${client.user.discriminator}}`
	);
});
