const { getMatches } = require('../services/');
const { matchesEmbed } = require('../libs/embed');

const matches = async (server, message) => {
    try {
        const matchesList = await getMatches(server);
        matchesEmbed(matchesList, message);
    } catch (error) {
        message.channel.send('Internal server error')
    }

}

module.exports = matches;