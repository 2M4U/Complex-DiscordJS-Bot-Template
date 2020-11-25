let { cooldown } = require("../Collections/Collections");

class XPHandler {
    constructor(client) {
        this.client = client;
        this.cooldown = cooldown;
        // this.levelledUp = new (require('../../modules/collection'))();
    };

    async handleMessage(message, guild, user) {
        if (this.cooldown.has(message.author.id)) {
            return;
        }
        /**
         * Add XP Features Here
         */
    }
};

module.exports.trigger = new XPHandler();