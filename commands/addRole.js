module.exports = {
    name: "addrole",
    description: "Adds the input role",
    guildOnly: true,
    discord:true,
    args:true,
    usage:"<role>",
    execute(message, args) {
        let role = args.slice(0).join(" ");
		if (role.endsWith('Collab'))
			return message.reply('Message the collab organizer if you would like to participate in this collab!');

		if (['Admins', "Moderators", 'BrenBot', 'Contributor', 'james', 'Advent Calendar'].indexOf(role) > -1)
			return message.reply('Hey stop that!');
		if (["Newgrounder", 'Supporter'].indexOf(role) > -1)
			return message.reply('the role "' + role + '" requires you to log into the Newgrounds API. Use the command `fulpNG`');
		let curRole = message.guild.roles.cache.find(darole => darole.name === role);

		if (!message.guild.roles.cache.some(daRole => daRole.name == role))
		{
			return message.reply(`This server doesn't seem to have ${role} as a role... you should know that the roles are case sensitive!`)
		}
		if (message.member.roles.cache.some(daRole => daRole.name == role))
		{
			return message.reply(`you already have the ${curRole.name} role!`)
		}
			
		message.member.roles.add(curRole);
        message.reply(`just got the ${curRole.name} role!`);
        
    }
}