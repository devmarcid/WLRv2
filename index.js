const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions] });

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
	const hc = require("./custom_commands/screenshot.js");

	switch (c) {
		case ",ironman":
			ironmanData.genIronman(client, message);
			return;
		case ",speak":
			speakCommand.makeEcho(client, message);
			return;
		case ",ss":
			hc.sendScreenshot(client, message)
			return;
		case ",m": 
			hc.sendMeme(client, message);
			return;
		case ",meme":
			//repeat because I am using it as an alias.
			hc.sendMeme(client, message);
			return;
		case ",addss":
			message.reply("WIP");
			break;
		case ",addm":
			message.reply("WIP");
			break;
		default:
			return;
	}
});


