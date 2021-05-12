const Discord = require('discord.js');
const FS = require('fs');

const prefix = '!';

const jmotClient = new Discord.Client();

jmotClient.commands = new Discord.Collection();

const commandFiles = FS.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require('./commands/'.concat(file));
    jmotClient.commands.set(command.name, command);
}

jmotClient.login(require('./config.json').jmotToken);

jmotClient.once('ready', () => {
    console.log('JMOT is online');
});

jmotClient.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const arguments = message.content.slice(prefix.length).split(/ +/);
    const command = arguments.shift().toLowerCase();

    if (command) {
        jmotClient.commands.get(command).execute(message, arguments);
    } else {
        message.channel.send('Command ' + command + 'is not implemented or you misspelled it!');
    }

});