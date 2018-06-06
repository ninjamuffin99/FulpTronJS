const fs = require('fs');
const rp = require('request-promise');
const cheerio = require('cheerio');

// require the discord.js module
const Discord = require('discord.js');
// create a new Discord client
const client = new Discord.Client();
//command set up
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
//extra shit
const ytdl = require('ytdl-core');
const { prefix, token, ownerID } = require('./config.json')

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => 
{
	console.log('Ready!');
	console.log(`....................................................................................................
	.............................................'''''''''''............................................
	.........................................'''' '''   '''''''''.......................................
	.....................................'''''''''''' '''''''''''''''...................................
	...................................'''''''.'''.''...........''.'''''................................
	...............................'''''''...-..--:----.-:--..........'''''.............................
	............................'''''....---::-::///::::::::----::----....''''..........................
	................................-:--::::/://////////::::::::::/::::....'''''........................
	..........................---:-::--://////////////:::.--:::---://///:-...'  ''......................
	.........................-:-:::-...::-:::::::-.-:---.'-.-----:-----://:/:-''' ''....................
	........................-::::-.''---...-----.''...''''''......------::::::-.'''''...................
	.....................-.-::--.'''.-.''''.....''..''''''''....'....---:-::://:-''' '..................
	.....................-.::--. ''..''''''.'.''...'' '''''....' ''.....--::-::/:.''' '.................
	....................-::/-..'''..''''''''''''..'''''  '.'''''' '........-:--:/:..'' '................
	....................:+/--.''''.'       '' ''''' ''''''''''''' '.''.'....----//-...'''...............
	...................://:... ''''             ''''.:-''' ''   ' '' ''''....---:/:--...''..............
	..................-/+:.'.'  '' '.:'       ''.--:+:'   '''   '  ' '''''''..---/:-:...''..............
	................:/:/:.'..'     :so:'    ./+osssyo'   ..'./' '  '  ''''' ''''.::-:...................
	.............../sy:/-.'.'    '-yh/.''.-ohhhyyyy/' '/+o:+yd: ''. '' '      ''.-.--...................
	.............-+yys::-''''    :dyoyysyhmmddhhhy:'':yhhyydmmh.''::-+:'..     ''''.....................
	............:oysss-..'   '::.ymmmmmmmNNNNmmmh:-oyddddmmmmmmy- '/yhdo-s/'     '..--.--...............
	...........:oyssss-.''   :hdsso+::--:+shdmmmhydmdddmmNNNNNNmd/''odmmsyyo. ''''.-:.-s/-..............
	..........-oysssss-.''   odh+/::::::::::/+sdmmmmdmmddyysosyyhhyo/hmmhysy:  ''.-::.:yy+..............
	.........-+yssssss:.'   .yhyyyyyyo/:-:oys++shdmmmdss+//::--.-:/osdmmdhyy/  ''.-:-.-syy:.............
	........./yyssssss/.'  'sdddhhysyo''-'/yhy++hdmNhsssssssoo++ososyyhmddhyo  ''.::.'-syh+.............
	........:oyssssssso.  'odddmhhhyso-''-ydhyosdmNNh+oysso+'' .-+ydhddmmhyys'  ''--..+ssho-............
	........+yyssssssss'' :ymmmmmdhhyyyyyyyyysoyhmNNy/shysys'. 'omdddmdmdhhhs'  ''..'/sssyy:............
	.......:oysssssssssy/'/hdmmmmmmmmddhhhhhhdshdmNNyyhhhhso/:/+syyhdmmmdhhhs.    ''-osssyh/............
	......./sysssssssssmy:yddmmmmmmmmmmNmmmmmmshdNNmshmmddhhyyhhhhyhdmmmmdhhy'   '-oossssyh+-...........
	.......+hysssssssssdmhyddmmmmmNmmmmmmmmmmdyydNNmhdmmmmmmmmmmmmmmmmmmmddds' './shsssssyh+............
	......-ohsssssssssssdhyddmdmNMMNmmmmmmmddhshdmNNmmmmmmmmmmmmNNNNmmmmmmmdo' .oodssssssyh/............
	......:syssssssssssssyyhdddmNNNNmmmmmmsyyyhmmmmNNmmddmdddddmNNNNmmmmmmmmo.:yohyssssssyh/............
	....../yyssssssssssssssyhddmmmmmmmmmdooyyhhdddmmNmmyymmddddmNNNmmmmmmmdhssyyyhsssssssyy/............
	......:yysssssssssssssssyhddmmmmmmmyo///-/yhhhysshd+/sdmmddmmmmmmmmmmdhyyhddyssssssssys:............
	......:sysssssssssssssoooyddmmmmmmysys//.-:osys::sysoshmmddmmmmmmmmddhsshddssssssssssh+-............
	......:shssssssssssssss/+shdddmmmdyhdmddhdhyydddddddyhhdmmmdmmdmddhhhs+sssssssssssssys/.............
	......-+hsssssssssssssso/oyhhhdmdhhdmmmmmmdhhddddmdddhhhmmmmmmmddhyys+ssssssssssssssyo/.............
	......./hyssssssssssssss++shhhhhyyhdmmmdddddddddddddddhydmddmmmdhyys+osssssssssssssss+-.............
	.......:yhsssssssssssssso/+yhhhss++++/++syyssysssyhhhhy+hmdmmmdhyys/sssssssssssssssy+/..............
	........ohyssssssssssssss+/oyddddmdyssysoo++++++////+oo:ydmmmmdys+/ossssssssssssssyo+-..............
	........-yhyssssssssssssso/+ohddmmmddhhhddhhhhhhhyyyyhdymmmmmdy+/ohsssssssssssssssy+:...............
	.........:yyssoo++/+///::-.:osdddmmmmmdhhhhhhhhhdddmmmmmNmddhs/+yhdssssssssssssssy+/................
	..........-/-..''''''''' '''/syhddmmmmmdhyyyyhdddmmmmmmmmdhs+/oyhdd+-:+oosssssssyo/-................
	..''''' ' '''''''''''''' '''o+oyhddmmmmmhsosyhddmmmmmmmmdyo//syhddd/''''.-/oosyy+:..................
	'   '''''''''''''''''''' ''.sh++oshdddddddhhhdmmmmmmmddyo/:yhyhhddd:'''''' '.:+/....................
	'''''''''''''''''''''''' ''-ssohyo+syyhhhhhhhddddddhso+//sshmhddddh.' '''''''''''...................
	'''''''''''''''''''''''''''-soyddhs//oosyyyyyyyyyss+///+hhyydmmddh:'' '''''''''' '''................
	''''''''''''''''''''''''' ''ssdmddho/+++o+++++++ooossooydddhdmmdh/''''''''''''''''''''..............
	''''''''''''''''''''''''''''/sdmmmdy+ooyyyyyhhhhddddysyddmmmmmdh:''''''''''''''''''''''''...........
	'''''''''''''''''''''''''' '.oymmmmmyshdddddddddddddyshmmmmmmdy:''''''''''''''''''''''''''''........
	''''''''''''''''''''''''''''''oydmmmdydmmmmNNNNNmmmmyhmmmmmdhs.''''''''''''''''''''''''''''''''.....
	'''''''''''''''''''''''''''' '-syhdmmmdmmdddmmmmmmmmmmmmmmdy+''''''''''''''''''''''''''''''''''''''.
	''''..'''''''''''''''''''''''''.oyyddmmmmmmmNNNmmmmmmmmmmhs-''''''''''''''''''''''''''''''''''''''''
	'....'''''''''''''''''''''''''''./ssyhdmmmmmmmmmmmmmmmmdy/''''' ''''''''''''''''''''''''''''''''''''
	....''''''''''''''''''''''''''''''./+syyhddddmmmdddddhs:''''   '''''''''''''''''''''''''''''''''''''
	....''''''   ''''''''''''''''''' ''''.:+oyyyyyyyso+/:.''''  '''''''''''''''''''''''''''''...''''''''
	..'''''''    '''''''''''''''''''  ''''''''....'''''''''  ''''''''''''' '''' '''''''''''......'''''''
	.'.''''       ''''''''''''''''''''''''''''''''''''''  ''''''''''            ''''''''''.......'''''''`);
	console.info("FULPTRON IS ONLINE");
});

client.on('message', message => 
{
	//this message does not need the prefix 'fulp', because it's before that if statement below
	if (message.content === "testlol")
	{
		// message.reply basically the same as message.channel.send, but @'s the person who sent it
		message.reply("tesst");
	}

	if (message.content === "fulp")
	{
		// message.reply basically the same as message.channel.send, but @'s the person who sent it
		message.reply("What's up bud?");
	}

	//IF IT DOESNT START WITH "FULP" then IT DONT REGISTER PAST THIS POINT
	if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot ) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	// this message(and all others below it) does need a prefix, because it's after the if statement, and also needs the other info above, like command and args
	if (command == 'ping') 
	{
		// var emoji = Discord.emoji.from
		message.channel.send(`Pong! Ping: ${client.ping}ms`);
	}

	if (command == 'shame')
	{
		message.channel.send('**SHAAAAAME**');
	}

	if (command == 'playing') 
	{
		let text = args.slice(0).join(" ");
			client.user.setActivity(text, { type: 'PLAYING' })
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

					if (args[0] === undefined)
					{
						return message.reply('Ya gotta add a youtube link ya doofus');
					}
				
					if (!args[0].startsWith('https://www.youtube.com/watch'))
					{
						return message.reply('Please provide a youtube link!')
					}
				
				voiceChannel.join().then(connection => {
	            const stream = ytdl(args[0], { filter: 'audioonly' });
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

	if (command == 'kick')
	{
		if (!message.member.permissions.has("KICK_MEMBERS"))
		{
			return message.reply("you don't have permission to kick u doof!");
		}
		if (!message.mentions.users.size)
		{
			return message.reply('you need to @ someone to kick em')
		}

		const taggedUser = message.mentions.users.first();

		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	}

	if (command == 'prune' || command == 'purge')
	{
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount))
		{
			return message.reply('that does not seem to be a valid number');
		}
		else if (amount <= 1 || amount > 100)
		{
			return message.reply('you need to input a number between 1 and 99');
		}

		message.channel.bulkDelete(amount, true).catch(err =>
		{
			console.error(err);
			message.channel.send("OOPSIE WOOPSIE!! Uwu We madea fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!");
			message.channel.send("acutally there was just an error trying to prune message oopsies");
		})


	}

	// lol I gotta fix it so that it's in this format hh:mm:ss
	if (command == "uptime")
	{
		message.reply(`Current uptime is : ${client.uptime.toPrecision(2) * 0.001} seconds`)
	}

	

	if (command == 'args-info')
	{
		if (!args.length)
		{
			return message.channel.send(`You didn't provide any arguments, ${message.author}`);
		}

		message.channel.send(`Command name: ${command}\nArgumenets: ${args}`);
	}

	if (command === "asl") 
	{
		let age = args[0]; // Remember arrays are 0-based!.
		let sex = args[1];
		let location = args[2];
		message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
	}

	if (command === 'say')
	{
		let text = args.slice(0).join(" ");
		message.delete();
		message.channel.send(text);
	}

	if (command == 'roll')
	{
		let min = parseInt(args[0]);
		let max = parseInt(args[1]);

		if (isNaN(min))
			min = 0;
		if (isNaN(max))
			max = 20;
		
		message.channel.send(`🎲 You rolled a: ${Math.floor(Math.random() * (max - min + 1)) + min}`)

	}

	if (command == 'ngfollow')
	{
		let usr = args[0];
		if (usr == undefined)
		{
			return message.channel.send("Go to Newgrounds.com!\nhttps://newgrounds.com")
		}
		else
		{
			if (usr == 'Tom' || usr == 'TomFulp')
			{
				return message.channel.send("Go follow Tom Fulp himself on Newgrounds!\nhttps://TomFulp.newgrounds.com")
			}
			message.channel.send(`Go follow ${usr} on Newgrounds!\nhttps://${usr}.newgrounds.com`)
		}
	}

	if (command == 'loli')
	{
		 message.channel.send({ files: ['https://cdn.discordapp.com/attachments/422660110830272514/446516094006460417/unknown.png']})
		.then(message.channel.send('**inb4 BAN**'))
		.then(message.channel.send({ files: ['https://cdn.discordapp.com/attachments/422660110830272514/446516105880535041/unknown.png']}));
	}

	// WARNING VERY DANGEROUS COMMAND THAT CAN RUIN THE BOT'S HOST IF IN THE WRONG HANDS
	// BUT IM CODING IT IN FOR THE LOLS LMAOOO
	// make sure you set 'ownerID' as your discord ID (the numbers and shit) to make sure that no goon besides the host uses it
	if (command == 'eval')
	{
			if (message.author.id !== ownerID) return;
			try
			{
				const code = args.join(" ");
				let evaled = eval(code);

				if (typeof evaled !== "string")
					evaled = require("util").inspect(evaled);

				message.channel.send(clean(evaled), {code:"xl"});

			}
			catch(err)
			{
				message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
			}
	}

	// cheerio.js scraping help and info:
	// https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7
	// also check out the cheerio.js github and website
	if (command == "ngscrape")
	{
		let usr = args[0];

		if (usr === undefined)
			return message.reply("please input a name");
	
		const options = {
			uri: `https://${usr}.newgrounds.com`,
			transform: function (body) {
			  return cheerio.load(body);
			}
		  };
		  
		  rp(options)
			.then(($) => {
			  console.log($('.stats-general').text());
			  message.channel.send($('.stats-general').text());
			})
			.catch((err) => {
			  console.log(err);
			});
		
	}

	if (command == "ngaura")
	{
		let usr = args[0];

		if (usr === undefined)
			return message.reply("please input a name");
	
		const options = {
			uri: `https://${usr}.newgrounds.com`,
			transform: function (body) {
			  return cheerio.load(body);
			}
		  };
		  
		  rp(options)
			.then(($) => {
			  console.log($('.user-header-nav').text());
			  message.channel.send($('.user-header-nav').text());
			})
			.catch((err) => {
			  console.log(err);
			});
		
	}

});


function clean(text)
{
	if (typeof(text) == "string")
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
}

process.on('unhandledRejection', error => console.error(`Uncaught Promise Rejection:\n${error}`));

// login to Discord with your app's token
client.login(token);
