const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 8000;
const publicDirectory = path.join(__dirname, "../public");

app.use(express.static(publicDirectory));

io.on("connection", (socket) => {
  console.log("new web socket connection");

  socket.emit("message", generateMessage("Welcome!")); // to sent an event- name of the event
  socket.broadcast.emit("message", generateMessage("A new user has joined"));

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
      "locationMessage",
      generateLocationMessage(
        `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
      )
    );
    cb("Location Shared");
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("message", generateMessage("A user has left"));
  });
});

server.listen(port, () => {
  console.log("Server is up on port " + port);
});
