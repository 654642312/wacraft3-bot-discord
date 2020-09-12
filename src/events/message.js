const { prefix } = require('../config.json');

const eventsMessage = (client, showStats, showOponent) => {

    client.on('message', (message) => {
        if(message.content.startsWith(prefix + 'profile ')){
          const player = message.content.split(' ')[1];
          showStats(player, message);
        }
    });
    
    client.on('message', (message) => {
        if(message.content.startsWith(prefix + 'PlayNow ')){
          const player = message.content.split(' ')[1];
          showOponent(player, message)
        }
    });
}
  
module.exports = eventsMessage;