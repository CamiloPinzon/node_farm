const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = require("./modules/replace-template");

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

const server = http.createServer((request, response) => {
	const { query, pathname } = url.parse(request.url, true);

	if (pathname === "/overview" || pathname === "/") {
		response.writeHead(200, { "content-type": "text/html" });

		const cardsHtml = dataObj
			.map((card) => replaceTemplate(tempCard, card))
			.join("");

		const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

		response.end(output);
	} else if (pathname === "/product") {
		const product = dataObj[query.id];
		const output = replaceTemplate(tempProduct, product);

		response.writeHead(200, { "content-type": "text/html" });
		response.end(output);
	} else if (pathname === "/api") {
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
	console.log("Listening on 8000 port \n http://localhost:8000/");
});
