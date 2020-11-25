const Discord = require('discord.js');
const embed = new Discord.MessageEmbed();
module.exports.error = function(message, errors, timeout) {
    if (errors.length > 256) {

        embed.setColor(`RED`)
            .setTitle(`The error is ${errors.length - 256} over the embed character limit.\nError has been sent to owner via console.`)
        message.channel.send({ embed: embed }).then((msg) => {
            if (timeout) {
                msg.delete({ timeout: timeout })
            }
        });

        console.error(errors);
    }

    embed.setColor(`RED`)
        .setTitle(errors)
    message.channel.send({ embed: embed }).then((msg) => {
        if (timeout) {
            msg.delete({ timeout: timeout })
        }
    });
};
module.exports.buildEmbed = function(client, embedFieldData) {

    embed.setTimestamp()
        // TODO: Use branded color
        .setColor('#002366')
        .addFields(...embedFieldData);
    // return {
    //     fields: [{...embedFieldData }]
    // }
    return embed;
}