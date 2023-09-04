const http = require("http");

const server = http.createServer((request, response) => {
  console.log(request);
  response.end("Hello from the server!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on 8000 port");
});
