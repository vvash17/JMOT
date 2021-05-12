module.exports = {
    name : 'echo',
    description : 'echoes voice of summoner',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('You need to be in channel to use echo from JMOT');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You do not have permission to use echo from JMOT');
        if (!permissions.has('SPEAK')) return message.channel.send('You do not have permission to speak');
        const connection = await voiceChannel.join();

        const stream = connection.receiver.createStream(message.member.user,{});

        connection.play(stream,{seek: 0, volume: 1})
        //TODO implement this in the future
    }
}