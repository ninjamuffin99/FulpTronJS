module.exports = {
    name: "prune",
    description: "Prunes the amount of messages specified.",
    args:true,
    aliases: ["purge"],
    usage:"<amount of messages>",
    discord:true,
    execute(message, args) {
        if (!message.member.hasPermission('MANAGE_MESSAGES'))
		{
			return message.channel.send("You need to have the permission 'Manage Messages' enabled for one of your roles!");
		}

		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount))
		{
			return message.reply('that does not seem to be a valid number');
		}
		else if (amount <= 1 || amount > 100)
		{
			return message.reply('you need to input a number between 1 and 99');
		}

		message.channel.bulkDelete(amount, true).catch(err =>
		{
			console.error(err);
			message.channel.send("OOPSIE WOOPSIE!! Uwu We madea fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!");
			message.channel.send("acutally there was just an error trying to prune message oopsies");
		})
    }
}