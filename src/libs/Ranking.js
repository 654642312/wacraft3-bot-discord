const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { rankingEmbed } = require('./embed');
const { getDataRankings } = require('../services/index');

const ranking = async (message, seccion, server, img) => {
  try {
    const ranking = await getDataRankings(seccion, server);
    rankingEmbed(ranking, message, img);
  } catch (error) {
    message.channel.send('Internal server error');
  }
}

module.exports = ranking;