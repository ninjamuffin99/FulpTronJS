module.exports = {
    name: "asl",
    description: "asl ;))",
    args: true,
    usage: "<age> <sex> <location>",
    execute(message, args)
    {
        let age = args[0]; // Remember arrays are 0-based!.
		let sex = args[1];
		let location = args[2];
		message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
	
    }
}