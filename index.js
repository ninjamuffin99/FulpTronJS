const fs = require('fs');
const rp = require('request-promise');
const path = require('path');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const Keyv = require('keyv');


// require the discord.js module
const Discord = require('discord.js');
// create a new Discord client
const client = new Discord.Client();
const https = require('https');
const request = require('request');
const {Util} = require('discord.js');

//command set up
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//extra shit
const ytdl = require('ytdl-core-discord');

// consts
const nonDiscordUserMsg = 'you need to be using Discord to get this feature!';

// NOTE IMPORTANT READ THIS
// This line is commented in the master/heroku version, but it is needed if you were to run the code locally
// let {prefix, token, clientID, luckyGuilds, luckyChannels, ownerID, NGappID, NGencKey, spreadsheetID, GOOGLE_API_KEY, MMappID, mongoURI} = require('./config.json');
let {prefix, token, clientID, luckyGuilds, luckyChannels, ownerID, NGappID, NGencKey, spreadsheetID, GOOGLE_API_KEY, MMappID, mongoURI} = require('./config.example.json');


// THIS IS FOR HEROKU SHIT
if (process.env.prefix) prefix = process.env.prefix;
if (process.env.clientID) clientID = process.env.clientID;
if (process.env.ownerID) ownerID = process.env.ownerID;
if (process.env.token) token = process.env.token;
if (process.env.NGappID) NGappID = process.env.NGappID;
if (process.env.NGencKey) NGencKey = process.env.NGencKey;
if (process.env.spreadsheetID) spreadsheetID = process.env.spreadsheetID;
if (process.env.GOOGLE_API_KEY) GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (process.env.MMappID) MMappID = process.env.MMappID;
if (process.env.mongoURI) mongoURI = process.env.mongoURI;

exports.prefix = prefix;
exports.MMappID = MMappID;

// Music bot shit
const YouTube = require(`simple-youtube-api`);
const youtube = new YouTube(GOOGLE_API_KEY);

// TODO add process.env shit for heroku
const keyv = new Keyv(mongoURI);
keyv.on('error', err => console.error('Keyv connection error:', err));

const queue = new Map();

// gets filled later
// see prepPics() like 5 lines lower to see the bullshit im trying to do lmao
const fulpPics = [];

let shoomOCound = 1;

function prepPics()
{
	getImages('fulp');
	console.log('Fulp shit');
	getImages('dogl');
	console.log('dogl shit');
	getImages('delete');
	console.log('delete shit');
	
}

// ID's for server, and announcement channel in NG server
// used for caching shit and role reactions
const ngServerID = '628006277984944167';
const ngChannelID = '631992224296468531';

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', async () => 
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
	console.info(`FulpTron is on ${client.guilds.cache.size} servers!`);
	console.info(client.guilds.cache.map(g => g.name + " " + g.memberCount).join("\n"));

	// Specific code for newgrounds server, that finds the announcements channel, and caches the messages
	// Swap this with something for general purpose reacts later
	let ngServer = client.guilds.cache.find(ngGuild => ngGuild.id === ngServerID);
	let announcements = ngServer.channels.cache.find(announc => announc.id === ngChannelID);
	announcements.messages.fetchPinned();

	console.info("LUCKY GUILDS" + luckyGuilds);

	var memberShit = await keyv.get('fulptron');

	if (memberShit != undefined)
	{
		memberShit = JSON.parse(memberShit);

		memberShit.usersAPI.every(function(apiUser)
		{
			var inputData = {
				"app_id": NGappID,
				"debug": true,
				"call": {
					"component": "Gateway.ping",
					"parameters": {},
					}
			};
		
			request.post(
				'https://www.newgrounds.io/gateway_v3.php',
				{ form: {input: JSON.stringify(inputData)} },
				async function (error, response, body) 
				{
					let parsedResp = JSON.parse(response.body);
					
					console.log(apiUser + ": " + parsedResp.result.data.success);
				});
		});

	}

});

let ngRef = ['Cock joke. username is here', 'username, just do what comes natural -T', 'le username has arrived', 'username, do you remember what a tardigrade is?',
			'Angels sang out in an immaculate chorus, down from the heavends decended username', 'username was blammed for this post', 'username has nice titties for a lil boy',
		"Aw gee whiz I hope a username doesn't totally come out of nowhere and own me.", 'Cryptic metaphor -username', 'What the hell is private username doing in there?'];

client.on('guildMemberAdd', async member =>
{
	// code specific to the Flash Holes server
	if (member.guild.id == 283807027720093697)
	{
		let curRole = member.guild.roles.cache.find(darole => darole.name === "Flash Hole");
			
		member.roles.add(curRole);
	}

	//G
	let guildIndex = luckyGuilds.indexOf(member.guild.id);

	console.log(guildIndex);
	if (guildIndex != -1)
	{
		//REFRESHES CACHE FOR ROLE REACTIONS FOR NEW PEOPLE?
		let ngServer = client.guilds.cache.find(ngGuild => ngGuild.id === ngServerID);
		let announcements = ngServer.channels.cache.find(announc => announc.id === ngChannelID);
		announcements.messages.fetchPinned();

		console.log("SOMEONE JOINED NG SERVER??");

		let infoPart = '*\nYou can use the command `fulpNG` to sign into the Newgrounds API, roles can be added in the <#578314067752779796> and `fulpHelp` for more info)'

		let intro = ngRef[Math.floor(Math.random() * ngRef.length)];
		intro = intro.replace('username',  "**" + member.user.username + "**");

		return member.guild.channels.cache.find(channel => channel.id === '578313756015329283').send("*" + intro + infoPart);
	}

});
var emojiname = ["🎮", "🖥️", "🎵", "🎙️", "🎞️", "🎨", "✍️", "💩"],
    rolename = ["Game Developer", "Programmer", "Musician", "Voice Actor", "Animator", "Illustrator", "Writer", "Shitposter"];

client.on("messageReactionAdd", (e, user) => {
	if (user && !user.bot && e.message.channel.guild)
        for (let o in emojiname)
            if (e.emoji.name == emojiname[o]) {
                let i = e.message.guild.roles.cache.find(e => e.name == rolename[o]);
				e.message.guild.member(user).roles.add(i).catch(console.error);
				console.log('added role');
			}
});

client.on("messageReactionRemove", (e, n) => {
    if (n && !n.bot && e.message.channel.guild)
        for (let o in emojiname)
            if (e.emoji.name == emojiname[o]) {
                let i = e.message.guild.roles.cache.find(e => e.name == rolename[o]);
				e.message.guild.member(n).roles.remove(i).catch(console.error)
				console.log('removed role');
            }
});

client.on('message', async message => 
{
	// Don't respond to messages made by the bot itself
	if (message.author.id == client.user.id) return;

	let isInGuild = message.guild != null;
	let isDiscordUser = !message.author.bot;

	//RATING EMOTES ON NG SERVER
	let guildIndex = isInGuild ? luckyGuilds.indexOf(message.guild.id) : -1;
	if (guildIndex != -1)
	{
		if (!message.content.startsWith('[noreact]') && luckyChannels[guildIndex].includes(message.channel.id))
		{
			let regShit = new RegExp('((\.png|\.jpg|\.jpeg)|newgrounds\.com\/(art|audio|portal)\/(view|listen))', 'gi');
			if (message.attachments.size > 0 || regShit.test(message.content))
			{
				let picoSuffix = "";
				if (Math.random() > 0.5)
					picoSuffix = "pico"

				message.react(message.guild.emojis.cache.find(emoji => emoji.name === "0stars" + picoSuffix))
				.then(react => message.react(message.guild.emojis.cache.find(emoji => emoji.name === "1star" + picoSuffix)))
				.then(react => message.react(message.guild.emojis.cache.find(emoji => emoji.name === "2stars" + picoSuffix)))
				.then(react => 	message.react(message.guild.emojis.cache.find(emoji => emoji.name === "3stars" + picoSuffix)))
				.then(react => message.react(message.guild.emojis.cache.find(emoji => emoji.name === "4stars" + picoSuffix)))
				.then(react => message.react(message.guild.emojis.cache.find(emoji => emoji.name === "5stars" + picoSuffix)));
			}
		}
	}


	if (message.content.toLowerCase() === "are we talking about tom fulp?" || message.content.toLowerCase() === "are we talking about tom fulp?" )
	{
		// message.reply basically the same as message.channel.send, but @'s the person who sent it
		message.reply("I **LOVE** talking about Tom Fulp!");
	}
	else if (message.content.toLowerCase() === "can i get a rip in chat?")
	{
		// message.reply basically the same as message.channel.send, but @'s the person who sent it
		message.reply("\nRIP\nRIP\nRIP");
	}

	var daServerMetadata = await keyv.get(message.guild.id);

	if (daServerMetadata != undefined)
	{
		daServerMetadata = JSON.parse(daServerMetadata);

		if (!daServerMetadata.bannedWords.every(function(bannedWord)
		{
			return !message.content.toLowerCase().includes(bannedWord.toLowerCase())
		}))
		{
			console.log('Deleted message in ' + message.guild.name + " by " + message.author.username + ": " + message.content);
			return message.delete();
		}	
	}

	// if (message.content.includes())

	//Automate Welcome Channel WIP
	/*if(message.content.toLowerCase() === "test" || message.channel.id() === "read-the-rules-for-access"){
		//message.roles.add("NG");
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
	if (!message.content.toLowerCase().startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	console.log(args);
	console.log(args.length);
	


	// uncomment when all the commands are implemented
	// if (!client.commands.has(command))

	try {

		const daCommand = client.commands.get(command)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

		if (daCommand != undefined)
		{
			// Commands that need arguments
			if (daCommand.args && !args.length)
			{
				let reply = "You didn't provide any arguments!"
				
				if (daCommand.usage)
				{
					reply += `\nThe proper usage would be: \`${prefix}${daCommand.name} ${daCommand.usage}\``
				}

				return message.channel.send(reply);
			}

			// If needs to be discord user
			if (daCommand.discord && !isDiscordUser)
			{
				return message.reply(nonDiscordUserMsg);
			}

			// Commands that need to be in a server
			if (daCommand.guildOnly && message.channel.type !== 'text') {
				return message.reply('I can\'t execute that command inside DMs!');
			}

			daCommand.execute(message, args)
		}
		
	} catch (err)
	{
		console.error(err);
		message.reply(' there was an error trying to execute that command!');
	}

	// this message(and all others below it) does need a prefix, because it's after the if statement, and also needs the other info above, like command and args

	const serverQueue = isInGuild ? queue.get(message.guild.id) : null;
		console.log(serverQueue);
	
	if (command == 'rolesetup')
	{
		if (!message.member.hasPermission('MANAGE_MESSAGES'))
			return;

		let rolesEmbed = new Discord.MessageEmbed()
		.setTitle('NEWGROUNDS SERVER ROLE MANAGER')
		.setDescription('REACT WITH EMOTE TO GET ROLE U WANT')
		.setColor(0xfda238);

		var daString = "";
		var i;
		for (i = 0; i < emojiname.length; i++)
		{
			daString += `${rolename[i]} - ${emojiname[i]}\n`;
		}

		rolesEmbed.addField('ROLES', daString);

		let daMessage = await message.channel.send(rolesEmbed);
		message.delete();
		//"🎮", "🖥️", "🎵", "🎙️", "🎞️", "🎨", "✍️", "💩"
		daMessage.react("🎮")
		.then(react => daMessage.react("🖥️"))
		.then(react => daMessage.react("🎵"))
		.then(react => daMessage.react("🎙️"))
		.then(react => daMessage.react("🎞️"))
		.then(react => daMessage.react("🎨"))
		.then(react => daMessage.react("✍️"))
		.then(react => daMessage.react("💩"));
	}

	
	if (command == 'play' || command == 'join') 
	{
		if (!isInGuild) return;
		if (!isDiscordUser)
		{
			return message.reply(nonDiscordUserMsg);
		}
		//return message.channel.send("WOOPS if you are reading this fulpPlay is BUSTED right now. Ur boy ninjamuffin already knows this and is tryin to fix it");

		const searchString = args.slice(0).join(" ");
		const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';

		if (message.channel.type !== 'text') return;

		const { channel } = message.member.voice;

		if (!channel) {
			return message.reply('please join a voice channel first!');
		}

		const permissions = channel.permissionsFor(message.client.user);

		/*
		if (!message.member.speaking)
		{
			return message.channel.send('You are muted, so it is likely you should not be using me!');
		}
		*/
		if (!permissions.has('CONNECT'))
		{
			return message.channel.send("I can't join that voice channel with my current roles :(");
		}
		if (!permissions.has('SPEAK'))
		{
			return message.channel.send('I cannot speak in this voice channel with my current permissions :(');
		}
		if (!message.member.voice.channel.memberPermissions(message.member).has('SPEAK'))
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
				await handleVideo(video2, message, channel, true); // eslint-disable-line no-await-in-loop
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
						console.log("selection: " + message.content);

						var filter = m => m.content.startsWith('!vote');

						var response = await message.channel.awaitMessages(filter, {
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
			return handleVideo(video, message, channel);
		}
	} else if (command === 'skip') {
		if (!isDiscordUser)
		{
			return message.reply(nonDiscordUserMsg);
		}
		if (!message.member.voice.channel) return message.channel.send('You are not in a voice channel!');
		if (!message.member.voice.channel.memberPermissions(message.member).has('SPEAK'))
		{
			return message.channel.send('You do not have permission to speak in this channel, so it is likely you should not be using me either!');
		}
		
		if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
		console.log('skip has been used');
		serverQueue.connection.dispatcher.end();
		return undefined;
	} else if (command === 'stop') {
		if (!isDiscordUser)
		{
			return message.reply(nonDiscordUserMsg);
		}
		if (!message.member.voice.channel) return message.channel.send('You are not in a voice channel!');
		if (!message.member.voice.channel.memberPermissions(message.member).has('SPEAK'))
		{
			return message.channel.send('You do not have permission to speak in this channel, so it is likely you should not be using me either!');
		}
		
		if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
		return undefined;
	} else if (command === 'volume') {
		if (!isDiscordUser)
		{
			return message.reply(nonDiscordUserMsg);
		}
		if (!message.member.voice.channel) return message.channel.send('You are not in a voice channel!');

		if (!message.member.voice.channel.memberPermissions(message.member).has('SPEAK'))
		{
			return message.channel.send('You do not have permission to speak in this channel, so it is likely you should not be using me either!');
		}
		
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
		if (!serverQueue) 
			return message.channel.send('There is nothing playing.');
		else
			return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
			`);
	} else if (command === 'pause') {
		if (!isDiscordUser)
		{
			return message.reply(nonDiscordUserMsg);
		}
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ Paused the music for you!');
		}
		if (!message.member.voice.channel.memberPermissions(message.member).has('SPEAK'))
		{
			return message.channel.send('You do not have permission to speak in this channel, so it is likely you should not be using me either!');
		}
		
		return message.channel.send('There is nothing playing.');
	} else if (command === 'resume') {
		if (!isDiscordUser)
		{
			return message.reply(nonDiscordUserMsg);
		}
		if (serverQueue && !serverQueue.playing) 
		{
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ Resumed the music for you!');
		}
		return message.channel.send('There is nothing playing.');
	}
	else if (command == 'discord')
	{
		message.channel.send("https://discord.gg/HzvnXfZ");
	}
	/* 
	if (command == "timeout" && message.author.role("mod"))
	{
		if (!isInGuild) return;
		if (!isDiscordUser)
		{
			return message.reply(nonDiscordUserMsg);
		}

		let usr = args[0];
		
		if (!message.guild.roles.exists("name", role))
		{
			return message.reply(`This server doesn't seem to have ${role} as a role... you should know that the roles are case sensitive!`)
		}
		if (message.member.roles.exists("name", role))
		{
			return message.reply(`you alread have the ${curRole.name} role!`)
		}

		message.roles.add(curRole);
		//message.reply('just got the ${curRole.name} role!');
	}
	*/
	else if (command == 'cringe' || command == 'snap')
	{
		message.channel.send('brandyCringe.png', {files: [{
			attachment: "pics/brandy/brandyCringe.png",
			name: 'brandyCringe.png'
		}]});
	}

	else if ( command == 'delete' || command == 'delet' || command == 'gun')
	{
		let curPic = randomFromArray(2);
		message.channel.send(curPic, {files: [{attatchment: "pics/delete/" + curPic, name: curPic}]});
	}

	if (command == `pic`)
	{
		if (args[0] == "luis")
		{
			return message.channel.send("luis.jpg", {files: [{attachment: "pics/luis/" + "luis.jpg", name: 'luis.jpg'}]});
		}

		let curPic = randomFromArray(0);

		message.channel.send(curPic, {files: [{attachment: `pics/fulp/${curPic}`, name: curPic}]});
	}

	else if (command == "watching")
	{
		let text = args.slice(0).join(" ");
		client.user.setActivity(text, { type: 'WATCHING'});
	}

	else if (command == 'playing') 
	{
		let text = args.slice(0).join(" ");
			client.user.setActivity(text, { type: 'PLAYING' })
			.then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  			.catch(console.error);
	}
	else if (command == 'roll')
	{
		let min = 1;
		let max = parseInt(args[0]);

		if (isNaN(max))
			max = 20;
		
		message.channel.send(`🎲 You rolled a: ${Math.floor(Math.random() * (max - min + 1)) + min}`)

	}

	else if (command == 'ngfollow')
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

	else if (command == 'loli')
	{
		 message.channel.send({ files: ['https://cdn.discordapp.com/attachments/422660110830272514/446516094006460417/unknown.png']})
		.then(message.channel.send('**inb4 BAN**'))
		.then(message.channel.send({ files: ['https://cdn.discordapp.com/attachments/422660110830272514/446516105880535041/unknown.png']}));
	}

	else if (command == 'source' || command == 'sourcecode' || command == 'github')
	{
		message.channel.send("Dig through my code on Github: \nhttps://github.com/ninjamuffin99/FulpTronJS");
	}

	// WARNING VERY DANGEROUS COMMAND THAT CAN RUIN THE BOT'S HOST IF IN THE WRONG HANDS
	// BUT IM CODING IT IN FOR THE LOLS LMAOOO
	// make sure you set 'ownerID' as your discord ID (the numbers and shit) to make sure that no goon besides the host uses it
	else if (command == 'eval')
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

	else if (command == 'ngplay')
	{
		if (!isDiscordUser)
		{
			return message.reply(nonDiscordUserMsg);
		}

		if (!message.member.voice.channel.memberPermissions(message.member).has('SPEAK'))
		{
			return message.channel.send('You do not have permission to speak in this channel, so it is likely you should not be using me either!');
		}

		let songUrl = args[0];

		if (songUrl == undefined)
			return message.channel.send("Please leave a link to a Newgrounds audio submission!")

		if (songUrl.startsWith('https://www.newgrounds.com/playlists'))
		{
			const options = {
				uri: songUrl,
				transform: function (body) {
				  return cheerio.load(body);
				}
			  };

			  rp(options)
			  .then(($) => {
				  let songList = $('.itemlist.alternating').find('li');
				  
				  for (let i = 0; i < songList.toArray().length; i++)
				  {
					let daSong = songList.toArray()[i].children[1].children[1].attribs.href;
					daSong = daSong.slice(2, daSong.length);
					daSong = "https://" + daSong;
					handleNGSongs(daSong, message, message.member.voice.channel, true);
				  }
			  });
		}
		else
		{
			handleNGSongs(songUrl, message, message.member.voice.channel);
		}

		
	}

	// cheerio.js scraping help and info:
	// https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7
	// also check out the cheerio.js github and website
	else if (command == "ngscrape" || command == 'scrape' || command == 'stats')
	{

		//return message.channel.send("woops this command is busted right now sorry lolol");

		let usr = args[0];

		if (usr === undefined)
			return message.reply("please input a newgrounds username!");
	
		// Buuilds the embed
		let embed = new Discord.MessageEmbed()
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

	else if (command == "nglogout")
	{
		if (!isInGuild) return;
		await keyv.delete(message.author.id);
		return message.reply("all your base are belong back to you.");
	}
	else if (command == 'curblacklist')
	{
		if (!isInGuild || !message.member.hasPermission('MANAGE_MESSAGES')) return;

		var serverInfo = await keyv.get(message.guild.id);
		

		if (serverInfo == undefined)
		{
			serverInfo = initServerShit();
		}
		else
			serverInfo = JSON.parse(serverInfo);

		return message.channel.send(serverInfo.bannedWords);

	}
	else if (command == 'blacklist')
	{
		if (!isInGuild) return;

		if (!message.member.hasPermission('MANAGE_MESSAGES'))
		{
			return message.channel.send('You do not have permissions to add words to the blacklist!');
		}

		if (args.length < 1)
			return message.channel.send("Please input a word to blacklist!");

		var serverInfo = await keyv.get(message.guild.id);
		

		if (serverInfo == undefined)
		{
			serverInfo = initServerShit();
		}
		else
			serverInfo = JSON.parse(serverInfo);

		let text = args.slice(0).join(" ");
		serverInfo.bannedWords.push(text);

		await keyv.set(message.guild.id, JSON.stringify(serverInfo));
		return message.delete();
		// console.log(serverInfo);
	}

	else if (command == "nglogin" || command == 'ng' || command == 'login')
	{
		if (!isInGuild) return;
		var isLoggedIn = await keyv.get(message.author.id);
		if (isLoggedIn)
		{
			// console.log(message.author.username + ' EXISTS IN DATABASE');
			isLoggedIn = JSON.parse(isLoggedIn);
			// console.log(isLoggedIn);
			

			var inputData = {
				"app_id": NGappID,
				"debug": true,
				"session_id": isLoggedIn.session.id,
				"call": {
					"component": "App.checkSession",
					"parameters": {},
					}
				};

			// console.log('DA INPUT');
			// console.log(inputData);
		
			request.post(
				'https://www.newgrounds.io/gateway_v3.php',
				{ form: {input: JSON.stringify(inputData)} },
				async function (error, response, body) 
				{
					let parsedResp = JSON.parse(response.body);
					
					console.log(JSON.parse(response.body));

					
					var memberInfo = await keyv.get(message.author.id);
					memberInfo = JSON.parse(memberInfo);
					
					// NOTE actually fix this later

					

					console.log(parsedResp);
					
					signedIn = !parsedResp.result.data.session.expired && parsedResp.result.data.session.user;
					if (signedIn)
					{
						let newgroundsName = parsedResp.result.data.session.user.name;
						let isSupporter = parsedResp.result.data.session.user.supporter;

						memberInfo.supporter = isSupporter;
						memberInfo.newgroundsName = newgroundsName;
						memberInfo.expired = false;
						memberInfo.rememberUser = parsedResp.result.data.session.rememberUser;

						await keyv.set(message.author.id, JSON.stringify(memberInfo));

						if (isDiscordUser)
						{
							message.member.setNickname(newgroundsName);

							var remember = "";

							if (!memberInfo.rememberUser)
							{
								remember = "In the passport settings, you didn't set 'Remember Me', please check that!";
							}

							message.reply("successfully signed into the Newgrounds API!" + remember);
							let role = message.guild.roles.cache.find(darole => darole.name == 'Newgrounder');
							if (role)
							{
								message.member.roles.add(role);
							}
							else
							{
								console.error('Newgrounder role does not exist on this guild');
							}

							if (isSupporter)
							{
								role = message.guild.roles.cache.find(darole => darole.name == 'Supporter');
								if (role)
								{
									message.member.roles.add(role);
								}
								else
								{
									console.error('Supporter role does not exist on this guild');
								}
							}
						}
						else
						{
							message.reply("signed into the Newgrounds API, but without any Discord-specific features.");
						}
					}
				});
		}
		else
		{
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
				async function (error, response, body) {
					//console.log("BODY")
					//console.log(body);
					let parsedResp = JSON.parse(response.body);
					
					var ngUser = initMemberDate();

					ngUser.discordUsername = message.author.username;
					ngUser.discord = message.author.id;
					ngUser.session = parsedResp.result.data.session;

					var loggedInUsers = await keyv.get('fulptron');

					if (loggedInUsers == undefined)
					{
						loggedInUsers = {
							usersAPI: []
						};
					}
					else
						loggedInUsers = JSON.parse(loggedInUsers);
					
					loggedInUsers.usersAPI.push(message.author.id);
					await keyv.set('fulptron', JSON.stringify(loggedInUsers));


					console.log(ngUser.session);
					console.log(parsedResp);

					if (isDiscordUser)
					{
						await keyv.set(message.author.id, JSON.stringify(ngUser));

						console.log(parsedResp);
						message.reply('link sent. Confirm it and then type fulpNG here again!');
						message.author.send(`FulpTron will NOT have access to your Newgrounds password!!!\nFeel free to check the source code using the fulpSource command\nClick this link to sign into Newgrounds: ${parsedResp.result.data.session.passport_url}\nAnd then type in fulpNG again to get the roles!`);
					}
					else
					{
						if (args.length != 1)
						{
							message.reply("looks like you're not a Discord user. To log in, use this same command, but also type your email. (Don't worry, I'll take good care of it!)");
						}
						else
						{
							// Message contains an email address. Delete the message to "hide" the address and hopefully discourage jokers from sending it spam mail.
							message.delete();

							try
							{
								let transporter = nodemailer.createTransport({
									host: 'localhost',
									port: 25,
									tls: {
										rejectUnauthorized: false
									}
								});

								let info = await transporter.sendMail({
									from: '"FulpTronJS" <noreply-fulptron@miscworks.net>',
									to: `${args[0]}`,
									subject: 'FulpTron login',
									text: `Hi,\nLooks like you asked to link your Newgrounds account with a FulpTron-managed Discord server.\nFulpTron will NOT have access to your Newgrounds password!!!\nFeel free to check the source code using the fulpSource command\nClick this link to sign into Newgrounds: ${parsedResp.result.data.session.passport_url}\nAnd then type in fulpNG again to get the roles!\n\nIf none of this rings a bell, disregard this email.`
								});

								await keyv(ngUser.discord, JSON.stringify(ngUser));

								message.reply("email se--I mean, what's an email? (Psst, type fulpNG here again when you're done. If you get stuck, type fulpNGLogout.)");
							}
							catch (error)
							{
								console.log(error)
								if (error.code == 'EENVELOPE')
								{
									message.reply("I couldn't send an email to the address you just gave me. Check that it wasn't mistyped.");
								}
								else if (error.code == 'ESOCKET')
								{
									message.reply("I'm unable to send emails right now... Try again later.");
								}
								else
								{
									message.replay("something bad happened, but I don't know what... Try again later.");
								}
							}
						}
					}
				}
			);
			console.log('boop');
		}
			
	}
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

function handleNGSongs(songUrl, message, voicechannel, playlist=false)
{
	if (!songUrl.startsWith('https://www.newgrounds.com/audio'))
		return message.channel.send(`Woops, submission *${songUrl}* is not an audio submission, skipping...`)

	songUrl = songUrl.replace("listen", "feed");
	//console.log(songUrl);

	request.get(songUrl, {},
	function (error, response, body) 
	{
		let resp = JSON.parse(body);
		//console.log(resp);

		if (!resp.allow_external_api)
			return message.channel.send(`Sorry! The author of *${resp.title}* (NG user ${resp.authors[0].name}) has not allowed external API access, so it cannot be played. Message the author if you want this to be changed!`)

		const song = {
			id: resp.id,
			title: resp.title,
			url: resp.stream_url
		};
		
		console.log(song.url)

		
		if (song.url.length <= 2)
			return message.channel.send(`Song ${song.title} by ${resp.authors[0].name} cannot be played because they are not scouted yet!`)
		

		handleVideo(song, message, message.member.voice.channel, playlist);
	});
}

function initServerShit()
{
	var daServer = {
		"bannedWords": [

		],
		"aliases": [

		]
	};
	return daServer;
}

function initMemberDate()
{
	var daMember = {
		discord: false,
		discordUsername: "",
		supporter: false,
		session: {},
		username: '',
		expired: false,
		rememberUser: false
	};

	return daMember;
}

async function handleVideo(video, message, voiceChannel, playlist = false) {
	const serverQueue = queue.get(message.guild.id);
	console.log(video);
	let isOnNG = video.url.startsWith("https://audio.ngfiles.com");
	console.log(video.url);

	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: video.url,
		onNG: isOnNG
	};

	console.log('constructed song');

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
		console.log(queueConstruct);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
			console.log(queueConstruct.songs)
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


async function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	if (song.onNG)
	{
		const dispatcher = serverQueue.connection.play(song.url, {volume: 0.2})
		.on('finish', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason + " is the reason the thing ended");
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error("SHITS BUSTED"));
	}
	else
	{
		const dispatcher = serverQueue.connection.play(await ytdl(song.url, { filter: 'audioonly'}, { type: 'opus'}), {volume: 0.2, type: 'opus'})
		.on('finish', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error("SHITS BUSTED"));
	// dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	dispatcher.setVolumeLogarithmic(0.30);

	}
	
	
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
	fulpPics.push([]);
	files = fs.readdirSync(__dirname + '/pics/' + personFolder);
	files.forEach(function(f)
	{
		fulpPics[fulpPics.length - 1].push(f);
	});
}


function randomFromArray(arr)
{
	let thePic = Math.floor(Math.random() * fulpPics[arr].length);
	console.log(fulpPics[arr][thePic]);
	return fulpPics[arr][thePic];
}

process.on('unhandledRejection', error => console.error(`Uncaught Promise Rejection:\n${error.stack}`));

// login to Discord with your app's token
client.login(token);
