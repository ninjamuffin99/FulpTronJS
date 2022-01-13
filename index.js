require('dotenv').config();

const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { trace } = require('console');
const token = process.env.TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', function() {
    fs.readFile('fulp.txt', function(err, data) {
        console.log(data.toString());
        console.log('FULPTRON V2 IS ONLINE!!');
    });




});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this comman!', ephemeral: true });
    }
});


const ngServerID = '578313756015329281';
const ngChannelID = '578314067752779796';

client.on('guildMemberAdd', async member => {


    let ngServer = client.guilds.cache.find(ngGuild => ngGuild.id === ngServerID);
    let announcements = ngServer.channels.cache.find(announce => announce.id === ngChannelID);

    // announcements.

    let ngRef = [];
    fs.readFile('bootup/boot.txt', function(err, data) {

        // console.log(data.toString().split('\n'));
        ngRef = data.toString().split('\n');
        let intro = ngRef[Math.floor(Math.random() * ngRef.length)];
        intro.replace('username', "**" + member.user.username + "**");

        let infoPart = '*\nYou can use the command `fulpNG` to sign into the Newgrounds API, roles can be added in the <#578314067752779796> and `fulpHelp` for more info)';

        return member.guild.channels.cache.find(channel => channel.id === '578313756015329283').send("*" + intro + infoPart);
        // console.log(ngRef[Math.floor(Math.random() * ngRef.length)]);
    });
});

client.login(token);