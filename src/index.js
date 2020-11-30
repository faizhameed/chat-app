const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");

const {
  addUser,
  getUser,
  getUsersInRoom,
  removeUser,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 8000;
const publicDirectory = path.join(__dirname, "../public");

app.use(express.static(publicDirectory));

io.on("connection", (socket) => {
  console.log("new web socket connection");

  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) {
      return callback(error);
    }

    socket.join(user.room); //emit events specifically to that room

    socket.emit("message", generateMessage("admin", "Welcome!")); // to sent an event- name of the event
    socket.broadcast
      .to(user.room)
      .emit("message", generateMessage("admin", `${username} has joined!!`));
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  socket.on("submit", (text, cb) => {
    const filter = new Filter();
    if (filter.isProfane(text.message)) {
      return cb("Profanity is not allowed!");
    }
    const { username, room } = getUser(socket.id);
    const message = generateMessage(username, text.message);
    io.to(room).emit("submitted_message", message);
    cb();
  });

  socket.on("sendLocation", (coords, cb) => {
    const { username, room } = getUser(socket.id);
    io.to(room).emit(
      "locationMessage",
      generateLocationMessage(
        username,
        `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
      )
    );
    cb("Location Shared");
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage("Admin", `${user.username} has left!`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(port, () => {
  console.log("Server is up on port " + port);
});
