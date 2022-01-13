const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription("Sends link to FulpTron invite!"),
    async execute(interaction) {
        await interaction.reply(`Invite to server! ${interaction.client.generateInvite({scopes: ['bot']})}`);
    }
};