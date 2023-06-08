const { runGenerator } = require("@discordjs/ts-docgen");

runGenerator({
    existingOutput: "docs/typedoc.json",
    custom: "docs/index.yml",
    output: "docs/master.json",
    verbose: true,
});