const socket = io();

socket.on("countUpdated", (count) => {
  console.log("The count has been updated!", count);
  document.getElementById("count-d").innerHTML = count;
});

document.querySelector("#increment").addEventListener("click", () => {
  console.log("count clicked");
  socket.emit("increment");
});
