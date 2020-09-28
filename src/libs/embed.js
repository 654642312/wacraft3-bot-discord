const makeEmbed = (embed, name, playerAvatar, raceList, statsList, message) => {
    embed
    .setColor('#0099ff')
    .setTitle(name)
    .setThumbnail(playerAvatar)
    .setImage(playerAvatar);
    
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

module.exports = makeEmbed