const socket = io();

socket.on("messageReceived", (message) => {
  console.log("Input message", message);
  document.getElementById("text-d").innerHTML = message;
});

document.querySelector("#input").addEventListener("change", () => {
  const text = document.getElementById("input").value;
  console.log("input is changed", text);
  socket.emit("message", text);
});
