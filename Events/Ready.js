const CommandLoader = require("../Lib/Loaders/Commands");
const Commands = require("../Lib/Reloaders/CommandsReloader");

const Ready = async(client) => {
    if (client.guilds.cache.size < 1) {
        console.log(`Invite me to a server: https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958591/`);
    }
    console.log("Bot Online And Ready!");
    CommandLoader.load();
    Commands.reload();
};
module.exports = Ready;