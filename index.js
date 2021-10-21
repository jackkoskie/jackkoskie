require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");


async function main() {
    const readmeTemplate = (
        await fs.readFile(path.join(process.cwd(), "./README.template.md"))
    ).toString("utf-8");

    const inspirationalQuote = await (
        await fetch("https://zenquotes.io/api/random")
    ).json();

    const quote = inspirationalQuote[0]

    const readme = readmeTemplate
        .replace("{inspirationalQuote}", `<blockquote>${quote.q}<br>- ${quote.a}</blockquote>`)

    await fs.writeFile("README.md", readme);

    console.log(readme)
}

main();