const Discord = require('discord.js');

const jmotClient = new Discord.Client();


jmotClient.login('ODQxNjYyNDcyNTU2NTExMjQy.YJqBQg.09T4GThZTTbs4avouOkQg1Cilkw');

jmotClient.once('ready', () => {
    console.log('JMOT is online');
});

