let lazy = require('lazyinstaller');
let processHandler = function() {
    process.on('unhandledRejection', (error) => {
        console.error("[UNHANDLED REJECTION] " + (error.stack == undefined ? error : error.stack));
        lazy.npm(error);
    });
    process.on('uncaughtException', (error) => {
        console.log("[UNCAUGHT EXCEPTION] " + (error.stack == undefined ? error : error.stack));
        lazy.npm(error);
    });
};
module.exports.init = processHandler;