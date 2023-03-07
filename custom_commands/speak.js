const permissions = require("./../commands/data/permissions.json");

function makeEcho(client, message) {
    if (permissions['echo'].includes(message.author.id.toString())) {
        message.channel.send(message.content.split(" ").splice(0, 1).join(" "))
        return;
    } else {
        message.reply("the allegations aren't true!!!");
        return;
    }
}

module.exports = { makeEcho };
