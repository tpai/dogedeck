const fs = require("fs");
const fetch = require("isomorphic-fetch");
const cards = require("../cards.json");

const toDataURL = async (url) => {
  const res = await fetch(url);
  const buffer = await res.buffer();
  const contentType = await res.headers.get("content-type");
  return `data:${contentType};base64,` + buffer.toString("base64");
};

Promise.all(
  cards.map(async (card) => {
    const dataUrl = await toDataURL(card.src);
    return {
      title: card.title,
      type: card.type,
      src: dataUrl,
    };
  })
).then((cards) => {
  cards.map((card) => {
    const data = card.src.replace(/^data:image\/\w+;base64,/, "");
    const buf = Buffer.from(data, "base64");
    fs.writeFileSync(`./cards/${card.title.replace(/[":<>|*?]+/, '')}.png`, buf);
  });
});
