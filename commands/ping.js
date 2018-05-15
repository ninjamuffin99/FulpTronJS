module.exports = {
    name: 'ping',
    description: 'Pings the host',
    execute(message, args) {
        message.channel.send(`Pong! Ping: ${client.ping}ms`);
    },
};