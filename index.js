const fs = require('fs');
const rp = require('request-promise');
const path = require('path');
const cheerio = require('cheerio');

// require the discord.js module
const Discord = require('discord.js');
// create a new Discord client
const client = new Discord.Client();
const https = require('https');
const request = require('request');
const {Util} = require('discord.js');

const GoogleSpreadsheet = require('google-spreadsheet');
const {promisify} = require('util');

//command set up
client.commands = new Discord.Collection();

//extra shit
const ytdl = require('ytdl-core');

// NOTE IMPORTANT READ THIS
// This line is commented in the master/heroku version, but it is needed if you were to run the code locally
//const { prefix, token, ownerID, NGappID, NGencKey, GOOGLE_API_KEY, MMappID} = require('./config.json');

let gCreds = require('./fulpGdrive.json');
//let gCreds = require('./config.json');

const prefix = process.env.prefix;
const ownerID = process.env.ownerID;
const token = process.env.token;
const NGappID = process.env.NGappID;
const NGencKey = process.env.NGencKey;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const MMappID = process.env.MMappID;

gCreds.private_key_id = process.env.private_key_id;
gCreds.private_key = process.env.private_key;




// Music bot shit
const YouTube = require(`simple-youtube-api`);
const youtube = new YouTube(GOOGLE_API_KEY);

const queue = new Map();

// gets filled later
const fulpPics = [];

let shoomOCound = 2;

async function prepPics()
{
	await getImages('fulp');
	await getImages('dogl');
}

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => 
{
	prepPics();

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
	console.info(`FulpTron is on ${client.guilds.size} servers!`);
	console.info(client.guilds.map(g => g.name).join("\n"));

});

client.on('guildMemberAdd', async member =>
{
	// code specific to the Flash Holes server
	if (member.guild.id == 283807027720093697)
	{
		let curRole = member.guild.roles.find("name", "Flash Hole");
			
		member.addRole(curRole);
	}
});

client.on('message', async message => 
{

	//RATING EMOTES ON NG SERVER
	if (message.guild.id == 578313756015329281 && (message.channel.id == 578313839641231372 || message.channel.id == 578313930456170497))
	{
		if (message.attachments.size > 0 || message.content.startsWith("https://www.newgrounds.com/art/view"))
		{
			let picoSuffix = "";
			if (Math.random() > 0.5)
				picoSuffix = "pico"

			message.react(message.guild.emojis.find('name', "0stars" + picoSuffix))
			.then(react => message.react(message.guild.emojis.find('name', "1star" + picoSuffix)))
			.then(react => message.react(message.guild.emojis.find('name', "2stars" + picoSuffix)))
			.then(react => 	message.react(message.guild.emojis.find('name', "3stars" + picoSuffix)))
			.then(react => message.react(message.guild.emojis.find('name', "4stars" + picoSuffix)))
			.then(react => message.react(message.guild.emojis.find('name', "5stars" + picoSuffix)));
		}
			
	}


	if (message.content.toLowerCase() === "are we talking about tom fulp?" || message.content.toLowerCase() === "are we talking about tom fulp?" )
	{
		// message.reply basically the same as message.channel.send, but @'s the person who sent it
		message.reply("I **LOVE** talking about Tom Fulp!");
	}
	if (message.content.toLowerCase() === "can i get a rip in chat?")
	{
		// message.reply basically the same as message.channel.send, but @'s the person who sent it
		message.reply("\nRIP\nRIP\nRIP");
	}

	//Automate Welcome Channel WIP
	/*if(message.content.toLowerCase() === "test" || message.channel.id() === "read-the-rules-for-access"){
		//message.member.addRole("NG");
		message.reply("works");

		let usr = args[0];
		if (usr == undefined)
		{
			return message.channel.send("Go to Newgrounds.com!\nhttps://newgrounds.com")
		}

		//let usr = args[0];
		//`https://${usr}.newgrounds.com`

		if(class === "level-${}-${}"){
			
		}
	}*/

	if(message.content.toLowerCase() === "monster mashing"){
		message.reply("Did someone say M0NSTER MASHING!?\nhttps://www.newgrounds.com/portal/view/707498");
	}

	//IF IT DOESNT START WITH "FULP" then IT DONT REGISTER PAST THIS POINT
	if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot ) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	// this message(and all others below it) does need a prefix, because it's after the if statement, and also needs the other info above, like command and args
	if (command == 'ping') 
	{
		// var emoji = Discord.emoji.from
		let pang = Math.round(client.ping);
		message.channel.send(`Pong! Ping: ${pang}ms`);
	}

	if (command == 'shame')
	{
		message.channel.send('**SHAAAAAME**');
	}

	if(command == 'die'){
		message.channel.send(`(＾A＾)  ̿ ̿'̿'\̵͇̿̿\з`);
	}

	if (command == 'help')
	{
		message.channel.send("https://github.com/ninjamuffin99/FulpTronJS/blob/master/COMMANDS.md");
	}

	const serverQueue = queue.get(message.guild.id);
		console.log(serverQueue);
	 
	if (command == 'play' || command == 'join') 
	{
		return message.channel.send("WOOPS if you are reading this fulpPlay is BUSTED right now. Ur boy ninjamuffin already knows this and is tryin to fix it");

		const searchString = args.slice(0).join(" ");
		const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';

		if (message.channel.type !== 'text') return;

		const { voiceChannel } = message.member;

		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}

		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT'))
		{
			return message.channel.send("I can't join that voice channel with my current roles :(");
		}
		if (!permissions.has('SPEAK'))
		{
			return message.channel.send('I cannot speak in this voice channel with my current permissions :(');
		}
		if (!message.member.permissions.has('SPEAK'))
		{
			return message.channel.send('You do not have permission to speak in this channel, so it is likely you should not be using me either!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) 
		{
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) 
			{
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} 
		else 
		{
			try 
			{
				var video = await youtube.getVideo(url);
			} 
			catch (error) 
			{
				try 
				{
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					message.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
**Please provide a value to select one of the search results ranging from 1-10.**
					`);
					// eslint-disable-next-line max-depth
					try 
					{
						var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} 
					catch (err) {
						console.error(err);
						return message.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} 
				catch (err) 
				{
					console.error(err);
					return message.channel.send('🆘 I could not obtain any search results.');
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
	} else if (command === 'skip') {
		if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
	} else if (command === 'stop') {
		if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
	} else if (command === 'volume') {
		if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		if (!args[0]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
		if (args[0] > 200) return message.channel.send('pls do not use FulpTron for evil (max volume is 200)');
		serverQueue.volume = args[0];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
		return message.channel.send(`I set the volume to: **${args[0]}**`);
	} else if (command === 'np' || command === 'nowplaying') {
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
	} else if (command === 'queue' || command === 'q') {
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ Paused the music for you!');
		}
		return message.channel.send('There is nothing playing.');
	} else if (command === 'resume') {
		if (serverQueue && !serverQueue.playing) 
		{
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ Resumed the music for you!');
		}
		return message.channel.send('There is nothing playing.');
	}

	 
	// STUPID JS NOTE: MAKE SURE YOU USE ` BACKTICKS LIKE THIS, INSTEAD OF ' APOSTROPHES LIKE THIS
	// IF YOU WANT TO USE EZ VARIABLES AND SHIT
	if (command == 'server') 
	{
		message.channel.send(`This server's name is: ${message.guild.name}
Total members: ${message.guild.memberCount}
Server Region: ${message.guild.region}
		
FulpTron joined this server at: ${message.guild.joinedAt}
The Owner is: ${message.guild.owner.user.username}`);
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
		if (!message.member.hasPermission('MANAGE_MESSAGES'))
		{
			return message.channel.send("You need to have the permission 'Manage Messages' enabled for one of your roles!");
		}

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

	if (command == "uptime"){
		//message.reply(`Current uptime is : ${client.uptime.toPrecision(2) * 0.001} seconds`)
		let totalSeconds = (client.uptime / 1000);
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = totalSeconds % 60;
		let sec = Math.floor(seconds);
		let uptime = `${hours} hours, ${minutes} minutes and ${sec} seconds`;
		message.reply("Current uptime is : " + uptime);
	}

	if (command == "points")
	{
		let score = client.getScore.get(message.author.id, message.guild.id);
		if (!score)
		{
			score = {id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 };
		}
		score.points++;
		
		const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
		if(score.level < curLevel) 
		{
		  score.level++;
		  message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
		}

		console.log(`level status: ${curLevel} / ${score.level}`);

		client.setScore.run(score);
		console.log(score);
	}

	if (command == "picarto")
	{
		let username = args[0];
		let url = `https://api.picarto.tv/v1/channel/name/${username}`;

		https.get(url, (resp) => 
		{
			let data = '';

			// A chunk of data has been recieved.
			resp.on('data', (chunk) => {
			  data += chunk;
			});

			resp.on('end', () => {
				console.log(JSON.parse(data));
				JSON.parse(data, (key, value) =>
				{
					if (key == "online")
					{
						if (value)
						{
							message.channel.send(`${username} is streaming!`)
						}
						else
							message.channel.send(`${username} is not streaming :(`)
					}
				});

			  });
		});

	}


	if (command == "quiz")
	{
		// https://opentdb.com/api.php?amount=1

		let url = `https://opentdb.com/api.php?amount=1`;



		https.get(url, (resp) => 
		{
			let data = '';

			// A chunk of data has been recieved.
			resp.on('data', (chunk) => {
			  data += chunk;
			});

			resp.on('end', () => {
				let theQuiz = JSON.parse(data).results[0];
				console.log(JSON.parse(data).results[0])

				let messageSending = theQuiz.category + "\n" + unescapeHTML(theQuiz.question);

				let answerArray = theQuiz.incorrect_answers;
				let correctAnswerPos = Math.floor(Math.random() * (theQuiz.incorrect_answers.length + 1));
				console.log("Answer is " + correctAnswerPos);
				answerArray.splice(correctAnswerPos, 0, theQuiz.correct_answer)

				for (let a = 0; a < answerArray.length; a++)
				{
					messageSending += "\n" + (a + 1) + ". " + answerArray[a];
				}

				message.channel.send(messageSending).then(() =>
				{
					message.channel.awaitMessages(mess => mess.content.startsWith(correctAnswerPos + 1), {
						max: 1,
						time: 20000,
						errors: ['time'],
					  })
					  .then((collected) => {
						  message.reply(`You got the right answer i think, ${theQuiz.correct_answer}`);
						})
						.catch(() => {
						  message.channel.send(`Ran outta time, the correct answer was ${(correctAnswerPos + 1) + ". " + theQuiz.correct_answer}`);
						});
				});

// message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {

			  });
		});

	}

	//Cam you do it
	if (command == "addrole"){
		let role = args.slice(0).join(" ");
		if (['BOTS', 'gay!!', 'MOD', 'Jeff', 'Admin', 'Tom Fulp', 'Developer', 'DBZ', 'OG Ando', 'NG', 'Timeout', 'BrenBot', 'Contributor', 'james'].indexOf(role) > -1)
			return message.reply('Hey stop that!');
		let curRole = message.guild.roles.find("name", role);

		if (!message.guild.roles.exists("name", role))
		{
			return message.reply(`This server doesn't seem to have ${role} as a role... you should know that the roles are case sensitive!`)
		}
		if (message.member.roles.exists("name", role))
		{
			return message.reply(`you already have the ${curRole.name} role!`)
		}
			
		message.member.addRole(curRole);
		message.reply(`just got the ${curRole.name} role!`);
	}

	if (command == "removerole")
	{
		let role = args.slice(0).join(" ");
		if (['NG'].indexOf(role) > -1)
			return message.reply('Hey stop that!');
		let curRole = message.guild.roles.find('name', role);

		if (!message.guild.roles.exists("name", role))
		{
			return message.reply(`This server doesn't seem to have ${role} as a role... you should know that the roles are case sensitive!`)
		}
		if (!message.member.roles.exists("name", role))
		{
			return message.reply(`you already had the ${curRole.name} role removed!`)
		}

		message.member.removeRole(curRole).then(message.reply(`removed your ${curRole.name} role!`))
	}
	/* 
	if (command == "timeout" && message.author.role("mod"))
	{
		let usr = args[0];
		
		if (!message.guild.roles.exists("name", role))
		{
			return message.reply(`This server doesn't seem to have ${role} as a role... you should know that the roles are case sensitive!`)
		}
		if (message.member.roles.exists("name", role))
		{
			return message.reply(`you alread have the ${curRole.name} role!`)
		}

		message.member.addRole(curRole);
		//message.reply('just got the ${curRole.name} role!');
	}
	 */
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

	if (command == 'dogl' || command == 'dogg')
	{
		

		let curPic = randomFromArray(1);
		console.log("THE PIC");
		console.log(curPic);

		message.channel.send(curPic, {file: "pics/dogl/" + curPic});
	}

	if (command == `pic`)
	{
		if (args[0] == "luis")
		{
			return message.channel.send("luis.jpg", {file: "pics/luis/" + "luis.jpg"});
		}

		if (args[0] == 'dogl' || args[0] == "dogg")
		{
			let curPic = randomFromArray(1);
			console.log("THE PIC");
			console.log(curPic);

			return message.channel.send(curPic, {file: "pics/dogl/" + curPic});
		}

		let curPic = randomFromArray(0);
		console.log("THE PIC");
		console.log(curPic);

		message.channel.send(curPic, {file: "pics/fulp/" + curPic});
	}

	if (command == "watching")
	{
		let text = args.slice(0).join(" ");
		client.user.setActivity(text, { type: 'WATCHING'});
	}

	if (command == 'playing') 
	{
		let text = args.slice(0).join(" ");
			client.user.setActivity(text, { type: 'PLAYING' })
			.then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  			.catch(console.error);
	}

	if (command == "shoom" || command == "jojo")
	{
		let shoomBeginning = "**SH";

		for (i = shoomOCound; i > 0; i--)
		{
			shoomBeginning += "O";
		}

		shoomBeginning += "M**";
		shoomBeginning += `\nO Amount: ${shoomOCound}`

		shoomOCound += 1;

		message.channel.send(shoomBeginning);

	}

	if (command === 'say')
	{
		let text = args.slice(0).join(" ");
		message.delete();
		message.channel.send(text);
		
		console.log(message.author.username + " says: " + text);
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

	if (command == 'source' || command == 'sourcecode' || command == 'github')
	{
		message.channel.send("Dig through my code on Github: \nhttps://github.com/ninjamuffin99/FulpTronJS");
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
	if (command == "ngscrape" || command == 'scrape' || command == 'stats')
	{

		//return message.channel.send("woops this command is busted right now sorry lolol");

		let usr = args[0];

		if (usr === undefined)
			return message.reply("please input a newgrounds username!");
	
		// Buuilds the embed
		let embed = new Discord.RichEmbed()
		.setURL(`https://${usr}.newgrounds.com`)
		.setTitle(`${usr}'s stats on Newgrounds`, )
		.setTimestamp()
		.setColor(0xfda238)
		.setThumbnail("https://i.ytimg.com/vi/ZRFIqusuqN8/maxresdefault.jpg");
		// Dont want this stinky footer image
		// .setImage("https://desu-usergeneratedcontent.xyz/g/image/1499/80/1499801793392.png");

		

		const options = {
			uri: `https://${usr}.newgrounds.com`,
			transform: function (body) {
			  return cheerio.load(body);
			}
		  };
		  
		  rp(options)
			.then(($) => {
				let ngInfo = $('.user-header').text();
				let ngArray = ngInfo.split("\n");

				let ngInfo2 = $('.stats-general').text();
				let ngArray2 = ngInfo2.split("\n");

				infoClean(ngArray);
				infoClean(ngArray2);

				function infoClean(curList)
				{
					// NOTE This needs  alot of cleaning up. Currently the ngArray just slices out the first few bits, and the embed doesn't account
					// for if the user doesn't have a certain submission type, so currrently the embed is commented out
					let listOfShit = curList;
					let secondArray = [];

					// CLEANS THE ARRAY
					for (var i=0; i < listOfShit.length; i++)
					{
						listOfShit[i] = listOfShit[i].trim();
						listOfShit[i] = listOfShit[i].replace(/\t/g, "");
					}
					listOfShit = listOfShit.filter(function(value, index, arr)
					{
						return value != "";
					});

					listOfShit[listOfShit.length - 1] = listOfShit[listOfShit.length - 1].replace("Medals", " Medals");
					listOfShit[listOfShit.length - 1] = listOfShit[listOfShit.length - 1].replace("Supporter", " Supporter");
					let trophMedSupps = listOfShit[listOfShit.length - 1].split(" ");
					listOfShit.pop();

					trophMedSupps.forEach(function(shit)
					{
						/*
						if (shit.toLowerCase().trim().startsWith("supporter"))
						{
							console.log("CLEANED SUPP SHIT LAOSADKOASD");
							shit.concat(trophMedSupps[trophMedSupps.length - 2]);
							shit.concat(trophMedSupps[trophMedSupps.length - 1]);
							trophMedSupps.pop();
							trophMedSupps.pop();
							listOfShit.pop();
							listOfShit.pop();
						}
						*/
						listOfShit.push(shit)
						
					});
						
					for (var i=0; i < listOfShit.length; i++)
					{
						let dumb = listOfShit[i].trim();
						dumb = dumb.replace(/:/g, ": ");
						dumb = dumb.replace("Medals", " Medals");
						dumb = dumb.replace("Supporter", " Supporter");
						if (dumb.length > 0)
							secondArray.push(dumb);
					}

					let splitShit = secondArray.join('\n');

					embed.addField(`Submission stats`, `${splitShit}`, true);

				}

				message.channel.send({embed});
				// message.channel.send($('.stats-general').text());
			})
			.catch((err) => {
			  console.log(err);
			  message.channel.send(`an error occured.. did you enter in an actual Newgrounds user??` );
			});
		
	}

	if (command == "nglogin")
	{
		const doc = new GoogleSpreadsheet('10tGovoaOyTl1wBB0DUIu8Txa8Atk_5cTMnxF00Blt5Y');
		await promisify(doc.useServiceAccountAuth)(gCreds);
		const info = await promisify(doc.getInfo)();

		const sheet = info.worksheets[0];
		console.log(`Title: ${sheet.title}, Rows: ${sheet.rowCount}`);

		const Rows = await promisify(sheet.getRows)({
				offset: 1
		});

		console.log(Rows);

		var inputData = {
			"app_id": NGappID,
			"debug": true,
			"call": {
				"component": "App.startSession",
				"parameters": {},
			}
		};
	
		request.post(
			'https://www.newgrounds.io/gateway_v3.php',
			{ form: {input: JSON.stringify(inputData)} },
			function (error, response, body) {
				console.log("BODY")
				//console.log(body);
				let parsedResp = JSON.parse(response.body);
				console.log(JSON.parse(response.body));
				message.author.send(`FulpTron will NOT have access to your Newgrounds password!!!\nFeel free to check the source code using the fulpSource command\nClick this link to sign into Newgrounds: ${parsedResp.result.data.session.passport_url}`)
			}
		);
	}

	if (command == "mmscores")
	{

		var inputData = {
			"app_id": MMappID,
			"debug": false,
			"call": {
				"component": "ScoreBoard.getScores",
				"parameters": 
				{
					"id": 8004,
					"limit": 20,
					"period": "A"
				},
			}
		};
	
		request.post(
			'https://www.newgrounds.io/gateway_v3.php',
			{ form: {input: JSON.stringify(inputData)} },
			function (error, response, body) {
				console.log("RESPONSE")
				let parsedResp = JSON.parse(response.body);
				console.log(parsedResp);
				
				let scorePos = 0;

				let embed = new Discord.RichEmbed()
				.setURL(`https://www.newgrounds.com/portal/view/707498`)
				.setTitle(`Monster Mashing Hall Of Shame`, )
				.setTimestamp()
				.setColor(0xF30DFF)
				.setThumbnail("https://i.imgur.com/PMJb6SI.png");

				let field1 = [];
				let field2 = [];

				let listOfPeople = parsedResp.result.data.scores.map(s => {
					scorePos += 1;
					if (scorePos <= 10)
					{
						field1.push(`${scorePos}. [${s.user.name}](https://${s.user.name}.newgrounds.com) --- ${s.formatted_value}`);
					}
					else
						field2.push(`${scorePos}. [${s.user.name}](https://${s.user.name}.newgrounds.com) --- ${s.formatted_value}`);

					return `${scorePos}. [${s.user.name}](https://${s.user.name}.newgrounds.com) --- ${s.formatted_value}`;
				});

				console.log(listOfPeople.length);

				embed.addField("Distance", field1);
				embed.addField(" - ", field2);

				message.channel.send({embed});

				}
		);

	}

	if (command == "testerror" && message.channel.author.id == ownerID)
		message.channel.send(` <@${ownerID}> an error occured`);
	/* 
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
 	*/
});



function clean(text)
{
	if (typeof(text) == "string")
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
}

async function handleVideo(video, message, voiceChannel, playlist = false) {
	const serverQueue = queue.get(message.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(message.guild.id);
			return message.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return message.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	// dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	dispatcher.setVolumeLogarithmic(0.30);

	serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}
var htmlEntities = {
    nbsp: ' ',
    cent: '¢',
    pound: '£',
    yen: '¥',
    euro: '€',
    copy: '©',
    reg: '®',
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: '\''
};

function unescapeHTML(str) {
    return str.replace(/\&([^;]+);/g, function (entity, entityCode) {
        var match;

        if (entityCode in htmlEntities) {
            return htmlEntities[entityCode];
            /*eslint no-cond-assign: 0*/
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
            return String.fromCharCode(parseInt(match[1], 16));
            /*eslint no-cond-assign: 0*/
        } else if (match = entityCode.match(/^#(\d+)$/)) {
            return String.fromCharCode(~~match[1]);
        } else {
            return entity;
        }
    });
};

function getImages(personFolder)
{
	fs.readdir(__dirname + '/pics/' + personFolder, function(err, files)
	{		
		if (err)
		{
			console.log(err);
		}
		else
		{
			fulpPics.push([]);

			files.forEach(function(f)
			{
				fulpPics[fulpPics.length - 1].push(f);
			});
		}
	});
}


function randomFromArray(arr)
{
	let thePic = Math.floor(Math.random() * fulpPics[arr].length);
	console.log(fulpPics[arr][thePic]);
	return fulpPics[arr][thePic];
}

process.on('unhandledRejection', error => console.error(`Uncaught Promise Rejection:\n${error}`));

// login to Discord with your app's token
client.login(token);