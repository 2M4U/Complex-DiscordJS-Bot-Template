const { Client, Intents } = require("discord.js");
const Events = require("./Src/Handlers/EventHandler");
const conf = require("./Settings/conf.json");

console.clear();

/** BOT CONSTRUCTOR */
const client = new Client({
    // Add whatever you need here.
});

/** PARTS OF YOUR EVENTS FOLDER */
client.on("ready", () => Events.ready.init(client));
client.on("message", (message) => Events.message.init(client, message));


/** AUTHENTICATE TO DISCORDS v7 (as of current) GATEWAY */
client.login(conf.Discord.token);