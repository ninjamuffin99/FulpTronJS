const { SlashCommandBuilder } = require('@discordjs/builders');
const { execute } = require('./ping');

const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fulppic')
        .setDescription('Are we talking about Tom Fulp? I love talking about Tom Fulp!'),
    async execute(interaction) {

        const pics = [];
        const picFiles = fs.readdirSync('./pics/fulp');

        for (const file of picFiles) {
            pics.push(file);
        }

        const daPic = Math.floor(Math.random() * pics.length);

        await interaction.reply({
            content: pics[daPic],
            files: [`./pics/fulp/${pics[daPic]}`]
        });
    }
}