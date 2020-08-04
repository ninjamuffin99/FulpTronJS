module.exports = {
    name: "server",
    description: "Displays info about the server",
    guildOnly: true,
    execute(message, args)
    {
        // Redo that bit so that it doesnt work in DMs
        //if (!isInGuild) return;
		message.channel.send(`This server's name is: ${message.guild.name}
Total members: ${message.guild.memberCount}
Server Region: ${message.guild.region}
		
FulpTron joined this server at: ${message.guild.joinedAt}
The Owner is: ${message.guild.owner.user.username}`);
    }
}