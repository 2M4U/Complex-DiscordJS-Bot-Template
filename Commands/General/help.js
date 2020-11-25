let { commands } = require("../../Src/Collections/Collections");
module.exports.run = (client, message) => {

    var i;
    const commandsembed = {
        color: 0x00ffff,
        title: `Bot Commands!`,
        description: `Here is the list of all of my commands! Type ${client.conf.Discord.prefix}help [command name]`,
        fields: []
    }
    const cmds = commands.map(f => {
        return {
            name: f.help.name,
            aliases: f.help.aliases,
            usage: f.help.usage,
            cooldown: f.help.cooldown,
            category: f.help.category,
            config: f.config.ownerOnly
        }
    });

    for (i = 0; i < cmds.length; i++) {
        commandsembed.fields.push({
            name: cmds[i].name,
            value: [
                `Category: \`${cmds[i].category}\``,
                `Usage: \`${cmds[i].usage}\``,
                `Cooldown: \`${cmds[i].cooldown}\``
            ],
            inline: true
        });
    }
    return message.channel.send({ embed: commandsembed });
};

module.exports.help = {
    name: "help",
    aliases: ["h", "helpme", "menu"],
    description: "Find out information about the commands and or a set command",
    usage: "(command name)",
    category: "General",
    cooldown: 3 // Counted in MS
};

module.exports.config = {
    restricted: false,
    ownerOnly: false
};