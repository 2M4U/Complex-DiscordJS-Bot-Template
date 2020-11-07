const fs = require("fs");
const chokidar = require("chokidar");
const { basename } = require("path");
const event = fs.readdirSync(`${__dirname}/../../Events`);

const EventsReloader = async(client) => {
    event.forEach(e => {
        chokidar.watch(`${__dirname}/../../Events/${e}`, {
            awaitWriteFinish: true
        }).on("change", (file) => {

            const events = basename(file, ".js");
            /**
             * Fail Safe: Once the bot is connected to the Gateway you would have to restart the process 
             * This is to prevent reloading Ready state as it would be pointless. 
             */
            if (events === "Ready") return;

            console.log(`Event ${events} Updating.`);
            const load = require(`${__dirname}/../../Events/${events}`);
            let eventName = file.split(".")[0];
            client.on(eventName, load.bind(null, client));
            delete require.cache[require.resolve(`${__dirname}/../../Events/${events}`)];
            console.log(`Event ${events} Loaded.`);
        });
    });
};

module.exports.init = EventsReloader;