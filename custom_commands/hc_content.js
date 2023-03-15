//Go over case statements. catch statements could potentially be the case in terms of the bot responding twice when adding something to screenshots or memes.
//Shield @CrimsonWeave
var screenshots = require("./data/screenshots.json");
var memes = require("./data/memes.json");
var permissions = require("./data/permissions.json");
const fs = require("fs");


class hCord {
    constructor(client, message) {
        this.marcid = client.users.cache.get("552883292077293588");
    }
}
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
    const marcid = client.users.cache.get("552883292077293588");
    if ((message.content.split(" ").length <= 1) || (message.content.split(" ").length >= 3)) {
        message.reply("Invalid. stfu");
        return;
    }

    
    let link = message.content.split(" ")[1];
    marcid.send(`**User**: ${message.author.username}\n**Type**: ${content_type}\n**Link**: ${link}`);
	message.reply("Submitted");
    return;
        
    
}
//REPETITIVE CODE - Refactor later
async function permitUser(client, message, opt) {
    const marcid = client.users.cache.get("552883292077293588");
    if (message.author.id.toString() == marcid.id.toString()) {
        if (opt == 'permit') {
            if (message.content.split(" ").length <= 1 || (message.content.split(" ").length >=3)) {
                message.reply("stfu. haha!");
                return;
            }
            const user = message.mentions.users.first();
            if (user === undefined) {
                message.reply("User doesn't exist.");
                return;
            }
            permissions.push(user.id.toString());
            fs.writeFileSync("./custom_commands/data/permissions.json", JSON.stringify(permissions));
            message.reply(`Granted ${user.username} permissions to add and remove memes/screenshots.`);
            return;
        }
        if (opt == 'revoke') {
            if (message.content.split(" ").length <= 1 || (message.content.split(" ").length >=3)) {
                message.reply("stfu.");
                return;
            }
            const user = message.mentions.users.first();
            if (user === undefined) {
                message.reply("User doesn't exist.");
                return;
            }
            for (var i=0;i<permissions.length;i++) {
                if (permissions[i] == user.id.toString()) {
                    permissions.splice(i, 1);
                    fs.writeFileSync("./custom_commands/data/permissions.json", JSON.stringify(permissions));
                    message.reply(`permissions removed for ${user.username}.`);
                    return;
                }
            }
            message.reply(`${user.username} doesn't have permissions yet.`);
            return;
        }
        if (opt == 'list') {
            var usersPermitted = [];
            for (var i=0;i<permissions.length;i++) {
                tempUser = await client.users.fetch(permissions[i]);
                if (tempUser == undefined) {
                    message.reply("Invalid user");
                    return;
                }
                usersPermitted.push(tempUser.username);
            }
            message.reply(usersPermitted.join("\n"));
            return;
        }

    }    
}

module.exports = { sendContent, addContent, forceChannel, deleteContent, requestContent, permitUser };
