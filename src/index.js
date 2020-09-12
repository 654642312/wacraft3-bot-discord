const { config } = require('dotenv');

config();

const { Client } = require('discord.js');

const client = new Client();

client.on('ready', () => {
    console.log('bot is ready');
});

const showStats = require('./libs/showStats');
const showOponent = require('./libs/showOponent');
const eventsMessage = require('./events/message');

eventsMessage(client, showStats, showOponent);

client.login(process.env.DISCORD_TOKEN);