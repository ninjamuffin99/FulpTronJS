module.exports = {
    name: "kick",
    description: "Kicks the user",
	discord: true,
	guildOnly: true,
	args: false,
    execute(message, args) {
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
}