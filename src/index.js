const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 8000;
const publicDirectory = path.join(__dirname, "../public");

app.use(express.static(publicDirectory));

const text = "Welcome!";

io.on("connection", (socket) => {
  console.log("new web socket connection");

  socket.emit("message", text); // to sent an event- name of the event
  socket.broadcast.emit("message", "A new user has joined");

  socket.on("submit", (text, cb) => {
    const filter = new Filter();
    if (filter.isProfane(text.message)) {
      return cb("Profanity is not allowed!");
    }
    io.emit("submitted_message", text);
    cb();
  });

  socket.on("sendLocation", (coords, cb) => {
    io.emit(
      "message",
      `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
    cb("Location Shared");
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("message", "A user has left");
  });
});

server.listen(port, () => {
  console.log("Server is up on port " + port);
});
