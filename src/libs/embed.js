const Discord = require('discord.js');

const playerEmbed = (name, playerAvatar, raceList, statsList, message) => {

    let embed = new Discord.MessageEmbed();

    embed
    .setColor('#0099ff')
    .setTitle(name)
    .setThumbnail(playerAvatar);
    
    if(statsList.length !== 0){
        for(let i = 0; i<raceList.length; i++){
            embed.addFields(
                { name: raceList[i][2].substring(6).replace(/['"]+/g, ''), value: statsList[i] }
            );
        }
        return message.channel.send(embed);
    }
    message.channel.send('This player has no games');
}

const matchEmbed = (player, message) => {
    let embed = new Discord.MessageEmbed();

    embed.setColor('#0099ff')
    .setTitle('Game')
    .setThumbnail('https://www.w3champions.com//img/0.26f0662f.png')
    .addFields(
        { name: 'Match', value: player.teams[0].players[0].battleTag + '  VS  ' + player.teams[1].players[0].battleTag },
        { name: 'Map', value: player.map }
    )
    message.channel.send(embed);
}

const rankingEmbed = (ranking, message, img) => {
    let embed = new Discord.MessageEmbed();
    let embed2 = new Discord.MessageEmbed();
    let embed3 = new Discord.MessageEmbed();
    let embed4 = new Discord.MessageEmbed();

    embed
    .setColor('#0099ff')
    .setTitle('RANKING')
    .setThumbnail(img);

    ranking.map((player, i) => {
        if(i < 25){
            embed.addFields(
                { name: player.player1Id, value: 'Rank: ' + player.rankNumber, inline: true },
            )
        }else{
            if(i < 50){
                
                embed2.addFields(
                    { name: player.player1Id, value: 'Rank: ' + player.rankNumber, inline: true },
                );
            }else{
                if(i < 75){
                    embed3.addFields(
                        { name: player.player1Id, value: 'Rank: ' + player.rankNumber, inline: true },
                    );
                }else{
                    if(i < 100){
                        embed4.addFields(
                            { name: player.player1Id, value: 'Rank: ' + player.rankNumber, inline: true },
                        );
                    }
                }
            }
        }

    });

    if(embed.fields.length !== 0){
        message.channel.send(embed);
    }
    if(embed2.fields.length !== 0){
        embed2.setColor('#0099ff');
        message.channel.send(embed2);
    }
    if(embed3.fields.length !== 0){
        embed3.setColor('#0099ff');
        message.channel.send(embed3);
    }
    if(embed4.fields.length !== 0){
        embed4.setColor('#0099ff');
        message.channel.send(embed4);
    }
}

const matchesEmbed = (matchesList, message) => {

    let embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('MATCHES')
    .setThumbnail('https://www.w3champions.com//img/0.26f0662f.png');
    
    for(let i = 0; i<matchesList.matches.length; i++){
        embed.addFields(
            { name: 'Match', value: matchesList.matches[i].teams[0].players[0].battleTag + ' VS ' + matchesList.matches[i].teams[1].players[0].battleTag}
        )
    }
    message.channel.send(embed);
}


const helpEmbed = (message) => {
    let embed = new Discord.MessageEmbed();
    embed.setColor('#0099ff')
    .setTitle('Commands')
    .addFields(
        {name: '!profile name battleTag', value: 'Example: !profile Grubby 1278'},
        {name: '!vs name battleTag', value: 'Example: !vs Grubby 1278'},
        {name: '!Ranking league server', value: 'Example: !Ranking Grand Master Europe'},
        {name: '!Matches server', value: 'Example: !Matches Europe'},
        {name: '!Ranking league server', value: 'Example: !Ranking Grand Master Europe'},
    )
    message.channel.send(embed);
}


module.exports = { playerEmbed, rankingEmbed, matchesEmbed, helpEmbed, matchEmbed }