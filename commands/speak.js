const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('speak')
    .setDescription('Make WLR speak.')
    .addStringOption(option =>
        option.setName('message')
        .setDescription('The message you want WLR to speak.')
        .setRequired(true));

module.exports = {
    data,
    async execute(interaction) {
        interaction.reply(interaction.options.getString('message'));
    }
}