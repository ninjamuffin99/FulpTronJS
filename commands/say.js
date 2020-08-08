module.exports = {
    name: "say",
    description: "Make FulpTron say wacky things!",
    args:true,
    usage: "<wacky text here>",
    execute(message, args)
    {
        let text = args.slice(0).join(" ");
		message.delete();
		message.channel.send(text);
		
		console.log(message.author.username + " says: " + text);
    }
}