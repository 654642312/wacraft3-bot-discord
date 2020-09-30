const { getMatch } = require('../services/');
const { matchEmbed } = require('./embed');

const showOponent = async (player, id, message) => {
   try {
    const playerData = await getMatch(player, id);
    matchEmbed(playerData, message);
    
   } catch (error) {
    message.channel.send('Internal server error');
   }
}

module.exports = showOponent;