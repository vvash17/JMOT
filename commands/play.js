const ytdl = require('ytdl-core');
const ytsearch = require('yt-search');

module.exports = {
    name: 'play',
    description: 'Joins and plays a video from youtube',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('You need to be in channel to play a song');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You do not have permission to play a song');
        if (!permissions.has('SPEAK')) return message.channel.send('You do not have permission to speak');
        if (!args.length) return message.channel.send('You need to specify song name');

        const connection = await voiceChannel.join();

        const videoFinder = async (query) => {

            const videoResult = await ytsearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        if (video) {
            const stream = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})
                .on('finish', () => {
                    voiceChannel.leave();
                })

            await message.reply(':thumbsup: NowPlaying ***'.concat(video.title).concat('***'));
        } else {
            message.channel.send('Song not found');
        }
    }
}