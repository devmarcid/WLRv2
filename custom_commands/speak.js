const permissions = require("./data/permissions.json");

function makeEcho(client, message) {
    if (permissions.includes(message.author.id.toString())) {
		try {
			var echo = message.content.split(" ");
			echo.shift();
			echo = echo.join(" ");
			message.channel.send(echo);
			message.delete();
			return;
		} catch (error) {
			console.log(error);
			message.reply("stfu");
			return;
		}
    } else {
        message.reply("the allegations aren't true!!!");
        return;
    }
}

module.exports = { makeEcho };
