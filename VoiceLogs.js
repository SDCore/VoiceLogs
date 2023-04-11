const { Client, GatewayIntentBits } = require("discord.js");
const { discord } = require("./config.json");

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
	allowedMentions: { users: [] },
});

module.exports = { client };

require("./handler.js")(client);

client.login(discord.token);
