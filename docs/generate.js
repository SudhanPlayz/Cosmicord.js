const { runGenerator } = require("@discordjs/ts-docgen");

runGenerator({
    existingOutput: "docs/typedoc.json",
    custom: "docs/index.yml",
    output: "docs/master.json",
    spaces: 4,
    verbose: true,
});