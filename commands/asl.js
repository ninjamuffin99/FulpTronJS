const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('asl')
        .setDescription('asl ;))')
        .addIntegerOption(age =>
            age.setName('age')
            .setDescription('age???')
            .setRequired(true)
        )
        .addStringOption(sex =>
            sex.setName('sex')
            .setDescription('sex? (yes)')
            .setRequired(true)
        )
        .addStringOption(location =>
            location.setName('location')
            .setDescription('location???')
            .setRequired(true)
        ),
    async execute(interaction) {
        const a = interaction.options.getInteger('age');
        const s = interaction.options.getString('sex');
        const l = interaction.options.getString('location');

        await interaction.reply(`Hello ${interaction.member.displayName}, I see you're a ${a} year old ${s} from ${l}. Wanna date?`);
    }
}