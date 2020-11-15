const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 8000;
const publicDirectory = path.join(__dirname, "../public");

app.use(express.static(publicDirectory));

io.on("connection", () => {
  console.log("new web socket connection");
});

server.listen(port, () => {
  console.log("Server is up on port " + port);
});
