const socket = io();

socket.on("messageReceived", (message) => {
  console.log("Input message", message);
});

socket.on("submitted_message", (message) => {
  console.log(message);
});

// document.querySelector("#input").addEventListener("change", () => {
//   const text = document.getElementById("input").value;
//   console.log("input is changed", text);
//   socket.emit("message", text);
// });

document.querySelector("#myForm").addEventListener("submit", function (e) {
  e.preventDefault(); //stop form from submitting
  const name = document.getElementById("input-name").value;
  const message = document.getElementById("input-message").value;
  socket.emit("submit", {
    name,
    message,
  });
});
