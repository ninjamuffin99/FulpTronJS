module.exports = {
    name: "ping",
    description: "Ping!",
    execute(message, args) {
        let pang = Math.round(message.client.ws.ping);
		message.channel.send(`Pong! Ping: ${pang}ms`);
    }
}