const characters = require("./data/characters.json");

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

function genIronman(client, message) {

    const args = message.content.split(" ");
    if (args.length == 2) {
        if ((/\d/.test(args[1])) && args[1] < characters.length) {
            message.reply(getRandom(characters, args[1]).join("\n"));
            return;
        } else {
            message.reply(`Invalid number.`);
            return;
        }
    } else {
        message.reply("Syntax: ,ironman <number>");
    }

}


module.exports = { genIronman };