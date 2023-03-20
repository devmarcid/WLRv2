const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction] });


client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(token);

client.on(Events.MessageCreate, async (message) => {

	if (message.author.bot) {
		return;
	}

	//going to use switch statements/functions from seperate files for ',command's instead 

	const c = message.content.split(" ")[0];
	const ironmanData = require("./custom_commands/ironman.js");
	const speakCommand = require("./custom_commands/speak.js");
	const hc = require("./custom_commands/hc_content.js");


	switch (c) {
		case ",ironman":
			ironmanData.genIronman(client, message);
			return;
		case ",speak":
			speakCommand.makeEcho(client, message);
			return;
		case ",ss":
			hc.sendContent(client, message, 'screenshot');
			return;
		case ",m": 
			hc.sendContent(client, message, 'meme');
			return;
		case ",meme":
			hc.sendContent(client, message, 'meme');
			return;
		case ",addss":
			hc.addContent(client, message, 'screenshot');
			return;
		case ",addm":
			hc.addContent(client, message, 'meme');
			return;
		case ",delm":
			hc.deleteContent(client, message, 'meme');
			return;
		case ",delss":
			hc.deleteContent(client, message, 'screenshot');
			return;
		case ",reqss":
			hc.requestContent(client, message, 'screenshot');
			return;
		case ",reqm":
			hc.requestContent(client, message, 'meme');
			return;
		case ",commands":
			let res = ",permit - grant permissions to add/remove screenshots/memes\n,revoke - remove permissions to add/remove screenshots/memes\n,perms - list all permissions\nreqm <link> - request meme submission\n,reqss <link> - request screenshot submission\n,ironman <number>\n,speak - only certain users\n,ss\n,m\n,meme\n,addss - only certain users\n,addm - only certain users\n,delm - only certain users\n,delss - only certain users"
			message.reply(res);
			return;
		case ",permit":
			hc.permitUser(client, message, 'permit');
			return;
		case ",revoke":
			hc.permitUser(client, message, 'revoke');
			return;
		case ",perms":
			hc.permitUser(client, message, 'list');
			return;
		default:
			return;
	}
});

// client.on(Events.MessageReactionAdd, async (reaction, user) => {


// 	if (reaction.partial) {
//         try {
//             console.log("await reaction.fetch();");
//             await reaction.fetch();
//         } catch (error) {
//             console.log(error);
//             return;
//         }
//     }

// 	try {

// 		const sBoard = require("./skullboard/skullboard.js");
// 		sBoard.initSkullboard(client, reaction, user);

// 	} catch (error) {
// 		console.log("skullboard didn't work");
// 		console.log(error);
// 	}

	



// });
