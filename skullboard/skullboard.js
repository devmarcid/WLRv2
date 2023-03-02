const skullboard = require("./skullboard_guilds/data/skullboard.json");
const homiecordSkullboard = require("./skullboard_guilds/homiecord.js");
const skull_emote = "💀";

function initSkullboard(client, reaction, user) {

    if (reaction.message.guild.id == '844718328928796694') {
        homiecordSkullboard.startSkullboard(client, reaction, user, skull_emote);
        return;
    }

}

module.exports = { initSkullboard };