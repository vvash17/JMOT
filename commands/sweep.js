module.exports = {
    name: 'sweep',
    description: 'swiping given channel from messages consisting given text',
    async execute(message, args) {
        const permissions = message.member.permissions
        if (!permissions.has('SPEAK', true)) message.channel.send('You do not have enough permissions to do that');
        if (!args.length) return message.channel.send('You need to specify channel name and consisting text');
        if (args.length !== 2) message.channel.send('You have to specify channel name and consisting text (only)!');

        const channels = message.guild.channels.cache.toJSON()
        for (let i = 0; i < channels.length; i++) {
            const channel = channels[i]
            if (channel.name === args[0]) {
                const channelObject = message.guild.channels.cache.get(channel.id);
                if (channelObject) {
                    channelObject.messages.fetch({limit: 100}).then(messages => {
                        messages.forEach(message => {
                            if(message.content.includes(args[1]) || message.author.bot){
                                message.delete()
                            }
                        })
                    })
                }
            }
        }


    }
}