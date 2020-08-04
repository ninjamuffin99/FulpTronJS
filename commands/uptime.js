module.exports = {
    name: "uptime",
    description: "Shows the uptime of FulpTron",
    execute(message, args) {
        let totalSeconds = (message.client.uptime / 1000);
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = totalSeconds % 60;
		let sec = Math.floor(seconds);
		let uptime = `${hours} hours, ${minutes} minutes and ${sec} seconds`;
		message.reply("Current uptime is : " + uptime);
    }
}