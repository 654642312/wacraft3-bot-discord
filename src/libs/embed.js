const makeEmbed = (embed, name, playerAvatar, raceList, statsList, message) => {
    embed
    .setColor('#0099ff')
    .setTitle(name)
    .setThumbnail(playerAvatar)
    .setImage(playerAvatar);
    

    for(let i = 0; i<raceList.length; i++){
        embed.addFields(
            { name: raceList[i][2].substring(6).replace(/['"]+/g, ''), value: statsList[i] }
        );
    }
    message.channel.send(embed);
}

module.exports = makeEmbed