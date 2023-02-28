var skullboard = require("../data/skullboard.json");
const { EmbedBuilder } = require("discord.js");
const fs = require("fs");

function createEmb(reaction) {

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
async function startSkullboard(client, reaction, user, skull) {

    if (reaction.emoji.name == skull) {
        var count = reaction.message.reactions.cache.get(skull).count;
        if (count == 3) {
            //create skullboard post in channel as well as embed

            var skullboardPost = await client.channels.cache.get("1076250245584916520").send(
                { content: `${skull} **${count}**`, embeds: [createEmb(reaction)] }
            );

            skullboard[reaction.message.id.toString()] = {}
            skullboard[reaction.message.id.toString()]['skullboard_post'] = skullboardPost.id;
            skullboard = JSON.stringify(skullboard);
            fs.writeFileSync("../data/skullboard.json", skullboard);

        } else if (count > 3) {

            if (reaction.message.id in skullboard) {
                client.channels.get("1076250245584916520").messages.fetch(skullboard[reaction.message.id]['skullboard_post'])
                    .then(m => {
                        m.edit({ content: `${skull} **${count}**`, embeds: [createEmb(reaction)]})
                    })
                    .catch(console.error);
            }
        } else {
            //do nothing
            return;
        }
    }
}

module.exports = { startSkullboard };