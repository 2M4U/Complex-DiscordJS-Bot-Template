const CommandLoader = require("../Lib/Loaders/Commands");
const CommandsReloader = require("../Lib/Reloaders/CommandsReloader");
const EventsReloader = require("../Lib/Reloaders/EventsReloader");
const conf = require("../Settings/conf.json")
const Ready = async(client) => {
    if (client.guilds.cache.size < 1) {
        client.generateInvite({
            permissions: conf.Discord.invite_link_perms,
        }).then(link => console.log(`Generated bot invite link: \n${link}`)).catch(console.error);
    }
    console.log("Bot Online And Ready!");

    CommandLoader.load();
    CommandsReloader.init();
    EventsReloader.init(client);
};
module.exports.init = Ready;