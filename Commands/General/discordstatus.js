const DSH = require("../../Src/Handlers/DiscordStatusHandler");
module.exports.run = (client, message) => {
    DSH().then((result) => {
        message.channel.send({ embed: result });
    });
};


module.exports.help = {
    name: "dsh",
    aliases: ["apistatus", "discordstatus", "services"],
    description: "Retrieve information from Discord's Status page.",
    usage: "(command name)",
    category: "General",
    cooldown: 10 // Counted in MS
};

module.exports.config = {
    restricted: false,
    ownerOnly: false
};