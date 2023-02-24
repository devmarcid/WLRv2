const screenshots = require("./data/screenshots.json");
const memes = require("./data/memes.json");

function getRandom(arr) {
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
function sendScreenshot(client, message) {
    message.reply(getRandom(screenshots)[0]);
    return;
}
function sendMeme(client, message) {
    message.reply(getRandom(memes)[0]);
    return;
}

module.exports = { sendScreenshot, sendMeme };