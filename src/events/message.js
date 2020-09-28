const { prefix } = require('../config.json');

const eventsMessage = (client, embed, showStats, showOponent) => {

    client.on('message', (message) => {
        if(message.content.startsWith(prefix + 'profile ')){
          const player = message.content.split(' ')[1];
          const id = message.content.split(' ')[2]
          if(player && id){
            return showStats(player, id, message, embed);
          }
          message.channel.send('Wrong name or id');
        }
    });
    
    client.on('message', (message) => {
        if(message.content.startsWith(prefix + 'PlayNow ')){
          const player = message.content.split(' ')[1];
          const id = message.content.split(' ')[2];

          if(player && id){
            return showOponent(player, id, message, embed)
          }
          message.channel.send('Wrong name or id');
        }
    });
}
  
module.exports = eventsMessage;