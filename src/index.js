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

const text = "Welcome!";

io.on("connection", (socket) => {
  console.log("new web socket connection");

  socket.emit("messageReceived", text); // to sent an event- name of the event

  socket.on("message", (text) => {
    // socket.emit("countUpdated", count); // will only update to single connection
    console.log(text);
    io.emit("message", text);
  });
});

server.listen(port, () => {
  console.log("Server is up on port " + port);
});
