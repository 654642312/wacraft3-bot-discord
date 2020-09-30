const { config } = require('dotenv');

config();

const { Client } = require('discord.js');
const eventsMessage = require('./events/message');

const client = new Client();

client.on('ready', () => {
    client.user.setActivity('!help');
    console.log('bot is ready');
});

eventsMessage(client);

client.login(process.env.DISCORD_TOKEN);