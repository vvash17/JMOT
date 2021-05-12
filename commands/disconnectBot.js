module.exports = {
    name : 'disconnect',
    description : 'disconnects JMOT from channel',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('You need to be in channel to disconnect JMOT');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You do not have permission to disconnect JMOT');
        if (!permissions.has('SPEAK')) return message.channel.send('You do not have permission to speak');
        const connection = await voiceChannel.join();
        connection.disconnect();
    }
}