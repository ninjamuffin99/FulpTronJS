require('dotenv').config();

const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const token = process.env.TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
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

client.login(token);