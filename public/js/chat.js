const socket = io();

socket.on("message", (message) => {
  console.log("Input message", message);
});

socket.on("submitted_message", (message) => {
  console.log(message);
});

document.querySelector("#myForm").addEventListener("submit", function (e) {
  e.preventDefault(); //stop form from submitting
  const name = document.getElementById("input-name").value;
  const message = document.getElementById("input-message").value;
  socket.emit("submit", {
    name,
    message,
  });
});
