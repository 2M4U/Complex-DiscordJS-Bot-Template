var fs = require("fs");
const { commands, aliases } = require("../Collections/Collections")
const categories = fs.readdirSync(`${__dirname}/../../Commands`);

const CommandLoader = async() => {

    categories.forEach(category => {
        const files = fs.readdirSync(`${__dirname}/../../Commands/${category}`);
        if (files.length < 1) {
            console.log(`[Command Loader]: No commands found in ${category}. `)
        } else {
            console.log(`[Command Loader]: Total ${category} Commands Found: ${files.length}.`)
        }

        files.forEach(command => {
            if (command.split(".").slice(-1)[0] !== "js") return;
            const props = require(`${__dirname}/../../Commands/${category}/${command}`);
            let a = [];
            commands.set(props.help.name, props);
            props.help.aliases.forEach(alias => {
                aliases.set(alias, props.help.name);
                a.push(alias);
            });
            console.log(`[Command Loader]: Loaded ${command.replace(".js", "")} from ${category} with aliases ${a}.`);
        });
    });
};

module.exports.load = CommandLoader;