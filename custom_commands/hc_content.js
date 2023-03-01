var screenshots = require("./data/screenshots.json");
var memes = require("./data/memes.json");
var permissions = require("./data/permissions.json");
const fs = require("fs");

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
function sendContent(client, message, content_type) {
    switch (content_type) {
        case 'screenshot':
            message.reply(getRandom(screenshots)[0]);
            return;
        case 'meme':
            message.reply(getRandom(memes)[0]);
            return;
        default:
            console.log("Neither screenshot nor meme have been used for content_type");
            return;
    }

}
function sendMeme(client, message) {
    message.reply(getRandom(memes)[0]);
    return;
}
function addContent(client, message, content_type) {
    if (permissions.includes(message.author.id.toString()) == false) {
        message.reply("No perms. stfu");
        return;
    } 
    if ((message.content.split(" ").length <= 1) || (message.content.split(" ").length >= 3)) {
        message.reply("Invalid. stfu");
        return;
    }

    let link = message.content.split(" ")[1];
    try {
        switch (content_type) {
            case 'screenshot':
                screenshots.push(link);
                fs.writeFileSync("./custom_commands/data/screenshots.json", JSON.stringify(screenshots));
                message.reply('added');
                return;
            case 'meme':
                memes.push(link);
                fs.writeFileSync("./custom_commands/data/memes.json", JSON.stringify(memes));
                message.reply('added');
                return;
        }
    } catch (error) {
        message.reply("Error adding...");
        console.log(error);
    }
}


module.exports = { sendContent, addContent };