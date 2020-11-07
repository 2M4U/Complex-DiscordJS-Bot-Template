const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = (client, message) => {
    const embed = new Discord.MessageEmbed();
    embed.setTitle(`**__${client.user.username}'s Information__**`);
    embed.setDescription(
        [
            `> **Memory Usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`,
            `> **API Response:** ${Math.round(client.ws.ping)}ms`,
            `> **Uptime:** ${moment.duration(process.uptime() * 1000).humanize()}`,
        ].join("\n"));
    message.channel.send(embed);
};


module.exports.help = {
    name: "botinfo",
    aliases: ["binfo", "botinfo", "bi"],
    description: "Find out information about the bot",
    usage: "(command name)",
    category: "General",
    cooldown: 30 // Counted in MS
};

module.exports.config = {
    restricted: false,
    ownerOnly: false
};