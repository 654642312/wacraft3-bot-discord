const { prefix } = require('../config.json');
const showStats = require('../libs/showStats');
const showOponent = require('../libs/showOponent');
const ranking = require('../libs/Ranking');
const matches = require('../libs/matches');
const league = require('../leagues');

const { helpEmbed } = require('../libs/embed');
  

const eventsMessage = (client) => {

    client.on('message', (message) => {
        if(message.content.startsWith(prefix + 'profile ')){
          const player = message.content.split(' ')[1];
          const id = message.content.split(' ')[2]
          if(player && id){
            return showStats(player, id, message);
          }
          message.channel.send('Wrong name or id');
        }
    });
    
    client.on('message', (message) => {
        if(message.content.startsWith(prefix + 'vs ')){
          const player = message.content.split(' ')[1];
          const id = message.content.split(' ')[2];

          if(player && id){
            return showOponent(player, id, message)
          }
          message.channel.send('Wrong name or id');
        }
    });

    client.on('message', (message) => {
      if(message.content.startsWith(prefix + 'Ranking ')){
        const seccion = message.content.split(' ')[1] + ' ' + message.content.split(' ')[2];
        const server = message.content.split(' ')[3];
        
        let img;

        const grandMaster = 'https://www.w3champions.com//img/0.26f0662f.png'
        const master = 'https://www.w3champions.com/img/1.9730fb2e.png';
        const diamond = 'https://www.w3champions.com/img/2.48f016c5.png';
        const platinum = 'https://www.w3champions.com/img/3.0fe1d052.png';
        const gold = 'https://www.w3champions.com/img/4.a255b682.png';
        const silver = 'https://www.w3champions.com/img/5.7f2f103c.png';
        const bronze = 'https://www.w3champions.com/img/6.26efd96b.png';

        if(message.content.split(' ')[1] === 'Grand'){
          img = grandMaster
        }

        if(message.content.split(' ')[1] === 'Master'){
          img = master
        }

        if(message.content.split(' ')[1] === 'Diamond'){
          img = diamond
        }

        if(message.content.split(' ')[1] === 'Platinum'){
          img = platinum
        }

        if(message.content.split(' ')[1] === 'Gold'){
          img = gold
        }

        if(message.content.split(' ')[1] === 'Silver'){
          img = silver
        }

        if(message.content.split(' ')[1] === 'Bronze'){
          img = bronze
        }

        let indexLeague = 0;

        for(let i = 0; i<league.length; i++){
          if(league[i] === seccion){
            indexLeague = i;
          } 
        }
        if(server === 'America'){
          return ranking(message, indexLeague, 10, img);
        }
        if(server === 'Europe'){
          return ranking(message, indexLeague, 20, img);
        }
        message.channel.send('Error');
      }
    });

    client.on('message', (message) => {
      if(message.content.startsWith(prefix + 'Matches ')){
        const server = message.content.split(' ')[1];
        if(server === 'America'){
          return matches(10, message);
        }
        if(server === 'Europe'){
          return matches(20, message);
        }
        message.channel.send('Error');
      }
    });

    client.on('message', (message) => {
      if(message.content.startsWith(prefix + 'help')){
        helpEmbed(message);
      }
    });
}
  
module.exports = eventsMessage;