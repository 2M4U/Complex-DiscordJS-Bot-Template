const Discord = require("discord.js");

let cooldown = new Discord.Collection();
let commands = new Discord.Collection();
let aliases = new Discord.Collection();

module.exports = { cooldown, aliases, commands };