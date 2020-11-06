var fs = require("fs");
const { commands, aliases } = require("../Collections/Collections")
const categories = fs.readdirSync(`${__dirname}/../../Commands`);

const CommandLoader = async() => {

    categories.forEach(category => {
        const files = fs.readdirSync(`${__dirname}/../../Commands/${category}`);
        if (files.length < 1) {
            console.log(`No commands found in ${category}. `)
        } else {
            console.log(`Total ${category} ${files.length} Commands Found.`)
        }

        files.forEach(command => {
            if (command.split(".").slice(-1)[0] !== "js") return;
            console.log(`Loaded ${command.replace(".js", "")} from ${category}.`)
            const props = require(`${__dirname}/../../Commands/${category}/${command}`);

            commands.set(props.help.name, props);
            props.help.aliases.forEach(alias => {
                aliases.set(alias, props.help.name);
                console.log(`${command.replace(".js", "")} from ${category} with aliases ${alias} loaded.`);
            });
        });
    });
};

module.exports.load = CommandLoader;