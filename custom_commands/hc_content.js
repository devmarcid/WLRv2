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
                message.reply('added');
                screenshots.push(link);
                fs.writeFileSync("./custom_commands/data/screenshots.json", JSON.stringify(screenshots));
                break;
            case 'meme':
                message.reply('added');
                memes.push(link);
                fs.writeFileSync("./custom_commands/data/memes.json", JSON.stringify(memes));
                break;
        }
    } catch (error) {
        message.reply("Error adding...");
        console.log(error);
    }
}

function forceChannel(client, message) {

    const wlrChannel = message.guild.channels.cache.find(channel => channel.name.toLowerCase() === `wlrbot-commands`);

    if (!wlrChannel) {
        message.reply("WLR Channel not found. Make sure to name it #wlrbot-commands.");
        return true;   
    } 

    if (message.channel.id != wlrChannel.id) {
        message.channel.send(`<@${message.author.id}> please use <#${wlrChannel.id}>.`);
        message.delete();
        return true;
    } else {
        return false;
    }
}

function removeValue(arr, value, message) {
        
    for (var i=0;i<arr.length;i++) {
        if (arr[i] == value) {
            arr.splice(i, 1);
            message.reply("successfully deleted.");
            return arr;
        }
    }
    message.reply("couldn't find link.");
    return arr;

}
function deleteContent(client, message, content_type) {
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
                message.channel.send('deleting...');
                screenshots = removeValue(screenshots, link, message);            
                fs.writeFileSync("./custom_commands/data/screenshots.json", JSON.stringify(screenshots));
                break;
            case 'meme':
                message.channel.send('deleting...');
                memes = removeValue(memes, link, message);
                fs.writeFileSync("./custom_commands/data/memes.json", JSON.stringify(memes));
                break;
        }
    } catch (error) {
        message.reply("Error adding...");
        console.log(error);
    }
}
function requestContent(client, message, content_type) {
    if ((message.content.split(" ").length <= 1) || (message.content.split(" ").length >= 3)) {
        message.reply("Invalid. stfu");
        return;
    }

    let link = message.content.split(" ")[1];
    const marcid = client.users.cache.get("552883292077293588");
    marcid.send(`**User**: ${message.author.username}\n**Type**: ${content_type}\n**Link**: ${link}`);
	message.reply("Submitted");
    return;
        
    
}


module.exports = { sendContent, addContent, forceChannel, deleteContent, requestContent };
