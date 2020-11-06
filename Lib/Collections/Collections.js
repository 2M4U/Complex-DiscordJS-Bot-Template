const Discord = require("discord.js");

var cooldown = new Discord.Collection();
var commands = new Discord.Collection();
var aliases = new Discord.Collection();

module.exports = { cooldown, aliases, commands };