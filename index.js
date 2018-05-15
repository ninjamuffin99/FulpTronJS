// require the discord.js module
const Discord = require('discord.js');
// create a new Discord client
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const { prefix, token } = require('./config.json')

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => 
{
	console.log('Ready!');
});

client.on('message', message => 
{
	if (message.content === 'fulpPing') 
	{
		// var emoji = Discord.emoji.from

		// message.channel.send($'{emoji} Pong! Ping: {client.ping}ms');
	}

	if (message.content === 'fulpPlaying') 
	{
			client.user.setActivity('coolmathgames.com', { type: 'PLAYING' })
			.then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  			.catch(console.error);
	}

	if (message.content === '!play') 
	{
					if (message.channel.type !== 'text') return;

					const { voiceChannel } = message.member;

					if (!voiceChannel) {
						return message.reply('please join a voice channel first!');
					}

					voiceChannel.join().then(connection => {
	            const stream = ytdl('https://www.youtube.com/watch?v=Qlsu7RhOnsQ', { filter: 'audioonly' });
	            const dispatcher = connection.playStream(stream, { volume: 0.5 });

	            dispatcher.on('end', () => voiceChannel.leave());
	        });
	}

	// STUPID JS NOTE: MAKE SURE YOU USE ` BACKTICKS LIKE THIS, INSTEAD OF ' APOSTROPHES LIKE THIS
	// IF YOU WANT TO USE EZ VARIABLES AND SHIT
	if (message.content.toLowerCase().startsWith(`${prefix}server`)) {
		message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nServer Region: ${message.guild.region}`);
	}
});

// login to Discord with your app's token
client.login(token);
