module.exports = {
    name: "help",
    description: "List all of my commands or info about a specific command.",
    aliases: ['commands'],
    usage: "<command name>",
    args: false,
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

            return message.channel.send(data, { split: true });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 0} second(s)`);

        message.channel.send(data, { split: true });

    }
}