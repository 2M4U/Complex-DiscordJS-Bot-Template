let processHandler = function() {
    process.on('unhandledRejection', (error) => {
        console.error("[UNHANDLED REJECTION] " + (error.stack == undefined ? error : error.stack));
    });
    process.on('uncaughtException', (error) => {
        console.log("[UNCAUGHT EXCEPTION] " + (error.stack == undefined ? error : error.stack));
    });
};
module.exports.init = processHandler;
