const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('newgrounds-stats')
        .setDescription('Look up a users stats on Newgrounds!')
        .addStringOption(option =>
            option.setName('username')
            .setDescription('The Newgrounds user to get their stats!')
            .setRequired(true)),
    async execute(interaction) {
        const username = interaction.options.getString("username");
        await interaction.reply(username);
    }
};