const { SlashCommandBuilder } = require('discord.js');
const fs = require("fs");
const memes = require("./data/memes.json");
const screenshots = require("./data/screenshots.json");

const data = new SlashCommandBuilder()
    .setName('homiecord')
    .setDescription('General HC command.')
    .addStringOption(option =>
        option.setName('cmd')
        .setDescription('Execute given HC command.')
        .setRequired(true)
        .addChoices(
            { name: 'Screenshot', value: 'screenshot' },
            { name: 'Meme', value: 'meme' }
        ));

function getSingleRandom(arr) {
    var n = 1;
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

module.exports = {
    data,
    async execute(interaction) {
        const selection = interaction.options.getString('cmd');

        if (selection == 'screenshot') {
            var ss = getSingleRandom(screenshots)[0];
            await interaction.reply(ss);
        }
        if (selection == 'meme') {
            var mm = getSingleRandom(memes)[0];
            await interaction.reply(mm);
        }
    }
}