const { SlashCommandBuilder } = require('discord.js');
const characters = require('./data/characters.json');

function getRandom(arr, n) {
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

const data = new SlashCommandBuilder()
		.setName('ironman')
		.setDescription('get a list of random characters')
		.addIntegerOption(option =>
			option.setName('number')
			.setDescription('Number of characters you want to select.')
			.setRequired(true)
		);

module.exports = {
	data,
	async execute(interaction) {
		let chars = characters["characters"];
		let num = interaction.options.getInteger('number');
		let random_chars = getRandom(chars, num);
		let ran_str = random_chars.join('\n');
		await interaction.reply(ran_str);
	},
};
