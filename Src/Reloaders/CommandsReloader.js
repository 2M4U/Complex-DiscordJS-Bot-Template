var fs = require("fs");
const chokidar = require("chokidar");
const { basename } = require("path");
const { commands, aliases } = require("../Collections/Collections")
const categories = fs.readdirSync(`${__dirname}/../../Commands`);

console.log(categories)
const CommandReloader = async() => {
    categories.forEach(category => {
        chokidar.watch(`${__dirname}/../../Commands/${category}`, {
            awaitWriteFinish: true
        }).on("change", (file) => {
            const commandName = basename(file, ".js")
            delete require.cache[require.resolve(`${__dirname}/../../Commands/${category}/${commandName}.js`)];
            if (commands.get(commandName)) {
                commands.delete(`${__dirname}/../../Commands/${category}/${commandName}.js`);
            }
            console.log(commands.get(commandName))

            console.log(`Deleted ${commandName} from ${category}.`);

            const props = require(`${__dirname}/../../Commands/${category}/${commandName}.js`);
            commands.set(commandName, props);
            props.help.aliases.forEach(alias => {
                aliases.set(alias, commandName);
            });

            console.log(`Reloaded ${commandName} from ${category}.`);
        });
    });
};

module.exports.init = CommandReloader;