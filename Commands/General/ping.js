module.exports.run = (client, message) => {
    message.channel.send("PONG!");
};


module.exports.help = {
    name: "ping",
    aliases: ["pi"],
    description: "Ping :D",
    usage: "(command name)",
    category: "General",
    cooldown: 10 // Counted in MS
};

module.exports.config = {
    restricted: false,
    ownerOnly: false
};