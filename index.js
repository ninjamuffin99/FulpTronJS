const fs = require('fs');

// require the discord.js module
const Discord = require('discord.js');
// create a new Discord client
const client = new Discord.Client();
//command set up
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles)
{
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//extra shit
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
	//this message does not need the prefix 'fulp', because it's before that if statement below
	if (message.content === "testlol")
	{
		// message.reply basically the same as message.channel.send, but @'s the person who sent it
		message.reply("tesst");
	}

	//IF IT DOESNT START WITH "FULP" then IT DONT REGISTER PAST THIS POINT
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	// this message(and all others below it) does need a prefix, because it's after the if statement, and also needs the other info above, like command and args
	if (command == 'ping') 
	{
		// var emoji = Discord.emoji.from

		message.channel.send(`Pong! Ping: ${client.ping}ms`);
	}
	


	if (command == 'playing') 
	{
			client.user.setActivity(args.toString(), { type: 'PLAYING' })
			.then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  			.catch(console.error);
	}

	if (command == 'play' || command == 'join') 
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
	if (command == 'server') 
	{
		message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nServer Region: ${message.guild.region}`);
	}

	if (command == 'args-info')
	{
		if (!args.length)
		{
			return message.channel.send(`You didn't provide any arguments, ${message.author}`);
		}

		message.channel.send(`Command name: ${command}\nArgumenets: ${args}`);
	}

});

// login to Discord with your app's token
client.login(token);
