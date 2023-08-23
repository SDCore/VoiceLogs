const dotenv = require('dotenv');
const { Client, GatewayIntentBits } = require('discord.js');
const { Guilds, GuildVoiceStates } = GatewayIntentBits;

dotenv.config();

const { loadEvents } = require('./loadEvents.js');

const client = new Client({
	intents: [Guilds, GuildVoiceStates],
	allowedMentions: { users: [] },
});

client
	.login(process.env.DISCORD_TOKEN)
	.then(() => {
		loadEvents(client);
	})
	.catch(err => console.log(err));

module.exports = { client };
