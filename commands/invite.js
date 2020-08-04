module.exports = {
    name: "invite",
    description: "Pops an invite for FulpTron into the chat",
    execute(message, args) {
        message.channel.send(`Use this link to invite FulpTron to a server that you have admin access on! https://discordapp.com/oauth2/authorize?client_id=381604281968623617&scope=bot&permissions=8`);
    }
}