module.exports = {
    name: "help",
    description: "List all of my commands or info about a specific command.",
    aliases: ['commands'],
    usage: "<command name>",
    execute(message, args)
    {
        const { prefix } = require('../index.js');

        const data = [];
        const { commands } = message.client;

        if (!args.length)
        {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            message.channel.send(data, { split: true });
        }
    }
}