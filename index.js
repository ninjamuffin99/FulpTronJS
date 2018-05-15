// require the discord.js module
const Discord = require('discord.js');
// create a new Discord client
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const config = require('./config.json');

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === 'fulpPing') {
		// var emoji = Discord.emoji.from

		// message.channel.send($'{emoji} Pong! Ping: {client.ping}ms');
	}

	if (message.content === 'fulpPlaying') {
			client.user.setActivity('coolmathgames.com', { type: 'PLAYING' })
			.then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);
	}

	if (message.content === 'fulpPlay') {
		if (message.channel.type !== 'text') return;

		const { voiceChannel } = message.member;

		if (!voiceChannel) {
			return message.reply('Please join a voice channel first!');
		}

		voiceChannel.join().then(connection => {
			const stream = ytdl('https://www.youtube.com/watch?v=09R8_2nJtjg', { filter: 'audioonly' });
			const dispatcher = connection.playStream(stream);

			dispatcher.on('end', () => voiceChannel.leave());
		});

	}

	if (message.content == 'fulpReboot') {

	}

});

// login to Discord with your app's token
client.login(config.token);
