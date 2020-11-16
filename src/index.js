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

let count = 0;
io.on("connection", (socket) => {
  console.log("new web socket connection");

  socket.emit("countUpdated", count); // to sent an event- name of the event

  socket.on("increment", () => {
    count++;
    // socket.emit("countUpdated", count); // will only update to single connection
    io.emit("countUpdated", count);
  });
});

server.listen(port, () => {
  console.log("Server is up on port " + port);
});
