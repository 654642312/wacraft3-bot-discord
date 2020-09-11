const { config } = require('dotenv');

config();


const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { Client } = require('discord.js');
const { prefix } = require('./config.json');

const showStats = async (player, message) => {

  let statsList = [];
  let raceList = [];

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(`https://www.w3champions.com/player/${player}`,{
    timeout: 0
  });
  const content = await page.content();
  const $ = cheerio.load(content);

  $('div.v-data-table.theme--light table tbody tr td span div').each((i, element) => {
    const race = $(element).html();
    raceList.push(race.split(' '));
  });
  $('div.v-data-table.theme--light table tbody tr td').next().each((i, element) => {
    let playerStats = $(element).text();
    statsList.push(playerStats);
  });

  const image = $('div.v-card__text div div div div div div').html();

  const elemetHTML = image.split(' ')[8]
  const imageClip = elemetHTML.substring(10,33)
  const imagePlayer = imageClip.split('.').slice(0, -1).join('.')

  const playerAvatar = 'https://www.w3champions.com' + imagePlayer + '.jpg';

  browser.close();

  for(let i = 0; i<raceList.length; i++){
    message.channel.send(raceList[i][2].substring(6));
    message.channel.send(statsList[i]);
  }
  message.channel.send(playerAvatar);
  
};

const showOponent = async (player, message) => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(`https://www.w3champions.com/player/${player}`,{
    timeout: 0
  });
  const content = await page.content();
  const $ = cheerio.load(content);

  const liveMatch = $('div.live-match__container div').next().text();

  browser.close();

  message.channel.send(liveMatch.split(' ')[1] + ' VS ' + liveMatch.split(' ')[3]);
  message.channel.send(liveMatch.split(' ')[5] + liveMatch.split(' ')[6]);
}


const client = new Client();

client.on('ready', () => {
  console.log('bot is ready');
});

client.on('message', (message) => {
  if(message.content.startsWith(prefix + 'profile ')){
    const player = message.content.split(' ')[1];
    showStats(player, message);
  }
});

client.on('message', (message) => {
  if(message.content.startsWith(prefix + 'PlayNow ')){
    const player = message.content.split(' ')[1];
    showOponent(player, message)
  }
});

client.login(process.env.DISCORD_TOKEN);





