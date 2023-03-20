const permissions = require("./data/permissions.json");

async function makeEcho(client, message) {
    if (permissions.includes(message.author.id.toString())) {
		if (message.content.split(" ").length == 1) {
			message.reply("Give a message to send dumbass");
			return;
		}
		let content = message.content.split(" ");
		content.shift();
		content = content.join(" ");
		message.channel.send(content);
		message.delete();
		return;
	} else {
		message.reply("no perms stfu");
		return;
	}
}

module.exports = { makeEcho };
