module.exports = {
    name: 'greeting',
    description: 'greeting command',
    execute(message, args) {
        message.channel.send('baro lasha!');
    }
}