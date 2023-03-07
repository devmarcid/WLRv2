const permissions = require("./../commands/data/permissions.json");

function makeEcho(client, message) {
    if (permissions['echo'].includes(message.author.id.toString())) {
		var echo = message.content.split(" ");
		echo.shift();
		echo = echo.join(" ");
        message.channel.send(echo);
		message.delete();
        return;
    } else {
        message.reply("the allegations aren't true!!!");
        return;
    }
}

module.exports = { makeEcho };
