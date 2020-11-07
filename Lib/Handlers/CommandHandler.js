const {
    cooldown,
    commands,
    aliases
} = require("../Collections/Collections");
const Discord = require("discord.js");
const utils = require("./UtilsHandler");
const prettyMilliseconds = require("pretty-ms");
const conf = require("../../Settings/conf.json")
    /**
     * 
     * @param {*} client Bot Client
     * @param {*} message Message Event from the Events
     * @param {*} args Arguments for each command (if required)
     * @param {*} cmd Command 
     */
const Command = async(client, message, args, cmd) => {

    let command;

    if (commands.has(cmd)) {
        command = commands.get(cmd);
    } else if (aliases.has(cmd)) {
        command = commands.get(aliases.get(cmd));
    }

    if (!command && !conf.Discord.commandNotFound) {
        return message.reply(`\`${cmd}\` command doesn't exist.`);
    }

    if (!cooldown.has(command.help.name)) {
        cooldown.set(command.help.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldown.get(command.help.name);
    const cooldownAmount = (command.help.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now);
            return message.reply(`Please wait ${prettyMilliseconds(timeLeft, { verbose: true })} before reusing the \`${command.help.name}\` command.`);
        }
    }

    try {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        if (command.config.ownerOnly == true && conf.Discord.owner !== message.author.id) {
            return utils.error(message, `:warning: **This command is restricted to Developers of ${client.user.username}.** :warning:`, 10000);
        }

        if (command.config.restricted == true && !conf.Discord.admins.includes(message.author.id)) {
            return utils.error(message, `:warning: **This command is restricted to Administrators of ${client.user.username}.** :warning:`, 10000);
        }

        if (message.guild.me.hasPermission(['MANAGE_MESSAGES'])) {
            message.delete();
        }

        command.run(client, message, args);

        console.log(`[Command Handler] \n${message.author.username}#${message.author.discriminator} Executed: ${command.help.name} \nServer: ${message.guild.name} \nWhere: ${message.channel.name}(#${message.channel.id})`)

    } catch (err) {

        console.error(`[Command Handler] ${err}`);

    }
};

module.exports.trigger = Command;