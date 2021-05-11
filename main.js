const Discord = require('discord.js');
const FS = require('fs');

const prefix = '!';

const jmotClient = new Discord.Client();

jmotClient.commands = new Discord.Collection();

const commandFiles = FS.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    console.log(file);
    const command = require('./commands/'.concat(file));
    jmotClient.commands.set(command.name, command);
}
jmotClient.login('ODQxNjYyNDcyNTU2NTExMjQy.YJqBQg.JRZ7ZN3MroWNXvE-pUQm3Q3OYlY');

jmotClient.once('ready', () => {
    console.log('JMOT is online');
});

jmotClient.on('message', message => {
   if(!message.content.startsWith(prefix) || message.author.bot) return;

   const arguments = message.content.slice(prefix.length).split(/ +/);
   const command = arguments.shift().toLowerCase();

   if(command === 'greeting') {
       jmotClient.commands.get(command).execute(message, arguments);
   }
});