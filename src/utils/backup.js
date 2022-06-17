const fs = require("fs");
const fetch = require("isomorphic-fetch");
const cards = require("../cards.json");

const toDataURL = async (url) => {
  const res = await fetch(url);
  const buffer = await res.buffer();
  const contentType = await res.headers.get("content-type");
  return `data:${contentType};base64,` + buffer.toString("base64");
};

const backupCards = fs.readdirSync('./cards')

Promise.all(
  cards.map(async (card) => {
    if (card.src.slice(-3) === "gif") return;
    if (backupCards.find(backupCard => backupCard.includes(card.title))) return;

    const dataUrl = await toDataURL(card.src);
    console.log(card.title, card.src);
    const data = dataUrl.replace(/^data:image\/\w+;base64,/, "");
    const buf = Buffer.from(data, "base64");
    fs.writeFileSync(`./cards/${card.title.replace(/[":<>|*?]+/, '')}.png`, buf);
  })
);
