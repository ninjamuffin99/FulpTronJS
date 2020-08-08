module.exports = {
    name: "ping",
    description: "Ping!",
    args: false,
    execute(message, args) {
        let pang = Math.round(message.client.ws.ping);
		message.channel.send(`Pong! Ping: ${pang}ms`);
    }
}