const Discord = require("discord.js");
const hastebin = require("hastebin-gen"); // May need updating to v2 of this NPM by Jacz
const conf = require("../../Settings/conf.json");

const clean = (text) => {
    if (typeof(text) === "string") {
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
    } else {
        return text
    }
};

module.exports.run = (client, message, args) => {
    try {
        const code = args.join(' ')
        let evaled = eval(code)

        if (typeof evaled !== 'string') {
            evaled = require('util').inspect(evaled, {
                depth: 0
            })
        }

        if (evaled.includes(client.token || conf.Discord.token)) {
            evaled = evaled.replace(client.token, 'REDACTED!')
        }

        if (clean(evaled).length > 1800) {
            hastebin(`[Eval output exceeds 2000 characters | ${args[0]}]: \n${evaled}`, "eval").then(r => {
                var hastLink = r
                console.log(`[Eval output exceeds 2000 characters | ${args[0]}]: ${hastLink}`);
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Eval output exceeds 2000 characters | ${args[0]}`)
                    .setURL(`${hastLink}`)
                    .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
                    .setDescription(`Eval output exceeds 2000 characters. \nView Evaluation [here](${hastLink}).`)
                    .setFooter(`Eval Output`)
                    .setTimestamp()
                message.channel.send({
                    embed
                }).catch((e) => {
                    message.channel.send(e.message)
                })
            }).catch(console.error);

        } else {
            message.channel.send(`${clean(evaled)}`, {
                code: 'yaml'
            })
        }
    } catch (err) {
        console.log(err)
        err = err.toString()
        if (err.includes(client.token || conf.Discord.token)) {
            err = err.replace(client.token, 'REDACTED!')
        }
        message.channel.send(`\`ERROR\` \`\`\`yaml\n${clean(err)}\n\`\`\``)
    }
};

module.exports.help = {
    name: "eval",
    aliases: ["eval", "e", "edev"],
    description: "Evaluate Code",
    usage: "eval (code)",
    category: "Developer",
    cooldown: 0 // Counted in MS - Not really needed here but its there XD
};

module.exports.config = {
    restricted: false,
    ownerOnly: true,
};