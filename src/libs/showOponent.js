const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const showOponent = async (player, id, message) => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

   try {
    await page.goto(`https://www.w3champions.com/player/${player}%23${id}`,{
      timeout: 40000
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
   } catch (error) {
    browser.close();
    message.channel.send('Wrong name or id')
   }
}

module.exports = showOponent;