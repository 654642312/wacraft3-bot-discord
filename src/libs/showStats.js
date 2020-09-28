const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const makeEmbed = require('./embed');

const showStats = async (player, id, message, embed) => {

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    let statsList = [];
    let raceList = []

    await page.goto(`https://www.w3champions.com/player/${player}%23${id}`, {
      timeout: 40000
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

    const elementHTML = $('div.v-card__text div div div div div div').html();

    const imagePlayer = elementHTML.split(' ')[8].substring(10, 33).split('.').slice(0, -1).join('.')

    const playerAvatar = 'https://www.w3champions.com' + imagePlayer + '.jpg';

    browser.close();

    makeEmbed(embed, player, playerAvatar, raceList, statsList, message)

  } catch (error) {
    browser.close();
    message.channel.send('Wrong name or id');
  }
};

module.exports = showStats;