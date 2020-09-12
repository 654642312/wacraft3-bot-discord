const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

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
  
    const elementHTML = $('div.v-card__text div div div div div div').html();
  
    const imagePlayer = elementHTML.split(' ')[8].substring(10,33).split('.').slice(0, -1).join('.')

    const playerAvatar = 'https://www.w3champions.com' + imagePlayer + '.jpg';
  
    browser.close();
  
    for(let i = 0; i<raceList.length; i++){
      message.channel.send(raceList[i][2].substring(6));
      message.channel.send(statsList[i]);
    }
    message.channel.send(playerAvatar);
};

module.exports = showStats;