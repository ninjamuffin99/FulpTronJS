module.exports = {
    name: "removerole",
    description: "Removes an input role",
    guildOnly: true,
    discord:true,
    args:true,
    usage:"<role>",
    execute(message, args) {

		let role = args.slice(0).join(" ");
		if (['Blammed'].indexOf(role) > -1)
			return message.reply('lol dummy');
		let curRole = message.guild.roles.cache.find(darole => darole.name === role);

		if (!message.guild.roles.cache.some(daRole => daRole.name == role))
		{
			return message.reply(`This server doesn't seem to have ${role} as a role... you should know that the roles are case sensitive!`)
		}
		if (!message.member.roles.cache.some(daRole => daRole.name == role))
		{
			return message.reply(`you already had the ${curRole.name} role removed!`)
		}

		message.member.roles.remove(curRole).then(message.reply(`removed your ${curRole.name} role!`))
	
        
    }
}