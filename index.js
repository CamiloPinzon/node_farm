const fs = require("fs");
const http = require("http");

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const replaceTemplate = (template, data) => {
  let tempOutput = template.replace(/{%PRODUCTNAME%}/g, data.productName);
  tempOutput = tempOutput.replace(/{%IMAGE%}/g, data.image);
  tempOutput = tempOutput.replace(/{%PRICE%}/g, data.price);
  tempOutput = tempOutput.replace(/{%FROM%}/g, data.from);
  tempOutput = tempOutput.replace(/{%NUTRIENTS%}/g, data.nutrients);
  tempOutput = tempOutput.replace(/{%QUANTITY%}/g, data.quantity);
  tempOutput = tempOutput.replace(/{%DESCRIPTION%}/g, data.description);
  tempOutput = tempOutput.replace(/{%ID%}/g, data.id);
  if (!data.organic) {
    tempOutput = tempOutput.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  } else {
    tempOutput = tempOutput.replace(/{%NOT_ORGANIC%}/g, "");
  }

  return tempOutput;
};

const server = http.createServer((request, response) => {
  const pathName = request.url;

  if (pathName === "/overview" || pathName === "/") {
    response.writeHead(200, { "content-type": "text/html" });

    const cardsHtml = dataObj
      .map((card) => replaceTemplate(tempCard, card))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    response.end(output);
  } else if (pathName === "/product") {
    response.end("this is: PRODUCT");
  } else if (pathName === "/api") {
    if (data) {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(data);
    }
  } else {
    response.writeHead(404, { "content-type": "text/html" });
    response.end("<h1>404 ERROR</h1></br><h2>Page not found!</h2>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on 8000 port");
});
