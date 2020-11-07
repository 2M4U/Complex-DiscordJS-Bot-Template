let CommandLoader = require("../Lib/Loaders/Commands");
let CommandsReloader = require("../Lib/Reloaders/CommandsReloader");
let EventsReloader = require("../Lib/Reloaders/EventsReloader");
let ProcessHandler = require("../Lib/Handlers/ProcessHandler");

let conf = require("../Settings/conf.json")
let Ready = async(client) => {
    if (client.guilds.cache.size < 1) {
        client.generateInvite({
            permissions: conf.Discord.invite_link_perms,
        }).then(link => console.log(`Generated bot invite link: \n${link}`)).catch(console.error);
    }
    console.log("[Ready Event]: Bot Online And Ready!");

    ProcessHandler.init();
    CommandLoader.load();
    CommandsReloader.init();
    EventsReloader.init(client);
};
module.exports.init = Ready;