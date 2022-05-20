const { Client } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

module.exports = async (client) => {
	// Event handler
	const events = await globPromise(`${process.cwd()}/events/*.js`);
	events.map((value) => require(value));
};
