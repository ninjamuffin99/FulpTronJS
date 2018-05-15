// require the discord.js module
const Discord = require('discord.js');
// create a new Discord client
const client = new Discord.Client();

const config = require('./config.json');

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === 'fulpPing')
	{
		// var emoji = Discord.emoji.from

		// message.channel.send($'{emoji} Pong! Ping: {client.ping}ms');
	}
});

// login to Discord with your app's token
client.login(config.token);
