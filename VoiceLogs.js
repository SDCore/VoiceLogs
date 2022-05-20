const { Client, Collection, Intents } = require("discord.js");
const { discord } = require("./config.json");

const client = new Client({
	intents: [Intents.FLAGS.GUILD_VOICE_STATES],
	allowedMentions: { users: [] },
});

module.exports = { client };

require("./handler.js")(client);

client.login(discord.token);
