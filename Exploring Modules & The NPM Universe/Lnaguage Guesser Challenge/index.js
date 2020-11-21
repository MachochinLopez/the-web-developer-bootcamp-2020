const franc = require("franc");
const langs = require("langs");
const colors = require("colors");

const input = process.argv[2];
const langCode = franc(input);

if (langCode === "und") {
    console.log("Woops, try with another phrase");
} else {
    const langName = langs.where("3", langCode);
    console.log(`Our best guess is: ${langName.name}`.yellow);
}