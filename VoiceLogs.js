const dotenv = require("dotenv");
const { Client, GatewayIntentBits } = require("discord.js");

dotenv.config();

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
	allowedMentions: { users: [] },
});

module.exports = { client };

require("./handler.js")(client);

client.login(process.env.DISCORD_TOKEN);
