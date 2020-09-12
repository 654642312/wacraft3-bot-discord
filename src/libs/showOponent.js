const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

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
  
    if(liveMatch.split(' ')[1] !== undefined){
      message.channel.send(liveMatch.split(' ')[1] + ' VS ' + liveMatch.split(' ')[3]);
      message.channel.send(liveMatch.split(' ')[5] + liveMatch.split(' ')[6]);
    }else{
      message.channel.send('he is not playing yet');
    }
}

module.exports = showOponent;