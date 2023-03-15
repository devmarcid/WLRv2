//might do a potential overhaul on the entire js file to get it running correctly and with more features.

const skullboard = require("./data/skullboard.json");
const skull_emote = "💀";
const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

function getEmbed(skullCount, reaction) {
    const e = new EmbedBuilder();
    var author = {}
    var linkField = {}
    author['name'] = reaction.message.author.username;
    author['iconURL'] = reaction.message.author.avatarURL();
    linkField['name'] = 'Source';
    linkField['value'] = reaction.message.url;
    e.setAuthor(author)
    .addFields(linkField)
    .setColor(0xA020F0);
    return e;
}

async function initSkullboard(client, reaction, user) {


    var skullCount = reaction.message.reactions.cache.get(skull_emote).count;
    if (reaction.emoji.name !== skull_emote) return;
    
    const skullChannel = reaction.message.guild.channels.cache.find(channel => channel.name.toLowerCase() === `skullboard-${skull_emote}`);

    if (!skullChannel) return console.log("Skullchannel not found.");

    if (((reaction.message.id.toString() in skullboard) == false) && skullCount > 1) {
        var newSkull = skullboard;
        //make message for skullpost
        var skullMessage = `${skull_emote} **${skullCount}**`;
        var skullPost = await skullChannel.send({ content: skullMessage, embeds: [getEmbed(skullCount, reaction)] });
        newSkull[reaction.message.id.toString()] = skullPost.id.toString();
        fs.writeFileSync('./skullboard/data/skullboard.json', JSON.stringify(newSkull));
        return;
    } else {
        if (skullCount <= 1) return;
        var skullPost =  await skullChannel.messages.fetch(skullboard[reaction.message.id.toString()]);
        if (skullPost) {
            skullPost.edit({content: `${skull_emote} **${skullCount}**`, embeds: [getEmbed(skullCount, reaction)]});
        } else {
            console.log("Skullpost not valid");
        }
        return;
    }

}

module.exports = { initSkullboard };