const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction] });

client.commands = new Collection();

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(token);

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	console.log(interaction);

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on(Events.MessageCreate, async (message) => {

	if (message.author.bot) {
		return;
	}

	let cmds = [",memepermit", ",sspermit", ",memerevoke", ",ssrevoke", ",ssperms", ",memeperms"];
	if (cmds.includes(message.content.split(" ")[0])) {
		message.reply("WIP; Will be back soon.");
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
			if (hc.forceChannel(client, message) == false) {
				hc.sendContent(client, message, 'screenshot');
				return;
			}
			return;
		case ",m": 
			if (hc.forceChannel(client, message) == false) {
				hc.sendContent(client, message, 'screenshot');
				return;
			}
			return;
		case ",meme":
			if (hc.forceChannel(client, message) == false) {
				hc.sendContent(client, message, 'screenshot');
				return;
			}
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
