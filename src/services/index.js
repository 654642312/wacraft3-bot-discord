const fetch = require('node-fetch');

const getDataRankings = async (seccion, server) => {
    const response = await fetch(`https://statistic-service.w3champions.com/api/ladder/${seccion}?gateWay=${server}&gameMode=1&season=3`);
    return response.json();
}

const getMatches = async (server) => {
    const response = await fetch(`https://statistic-service.w3champions.com/api/matches/ongoing?offset=0&gateway=${server}&pageSize=50&gameMode=1`);
    return response.json();
}

const getMatch = async (player, id) => {
    const response = await fetch(`https://statistic-service.w3champions.com/api/matches/ongoing/${player}%23${id}`);
    return response.json();
}

module.exports = { getDataRankings, getMatches, getMatch };