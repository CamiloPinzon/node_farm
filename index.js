const fs = require("fs");
const http = require("http");
const urlLib = require("url");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const server = http.createServer((request, response) => {
  const pathName = request.url;

  if (pathName === "/overview" || pathName === "/")
    response.end(`this is OVERVIEW`);
  else if (pathName === "/product") response.end("this is: PRODUCT");
  else if (pathName === "/api") {
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
