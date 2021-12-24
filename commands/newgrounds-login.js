const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('newgrounds-login')
        .setDescription("Allows you to log into Newgrounds API!"),
    async execute(interaction) {
        await interaction.reply({ content: 'SECRET', ephemeral: true });
    }
};