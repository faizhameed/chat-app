const socket = io();

socket.on("message", (message) => {
  console.log(message);
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

document.querySelector("#send-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });
});
