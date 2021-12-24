const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription("Gives information about the server!"),
    async execute(interaction) {

        const ownerStuff = await interaction.guild.fetchOwner();

        await interaction.reply(`This server's name is: ${interaction.guild.name}
Total members: ${interaction.guild.memberCount}
        
FulpTron joined this server at: ${interaction.guild.joinedAt}
The Owner is: ${ownerStuff.user.username}`);
    }
};