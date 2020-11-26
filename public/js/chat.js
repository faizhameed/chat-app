const socket = io();

//Elements

const $messageForm = document.querySelector("#myForm");
const $sendLocationBtn = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");
const $location = document.querySelector("#location");

//Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML;

socket.on("message", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message,
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("submitted_message", (message) => {
  console.log(message);
});

socket.on("locationMessage", (url) => {
  const html = Mustache.render(locationTemplate, { url });
  $location.insertAdjacentHTML("beforeend", html);
});
$messageForm.addEventListener("submit", function (e) {
  e.preventDefault(); //stop form from submitting
  const $name = document.getElementById("input-name");
  const $message = document.getElementById("input-message");
  const $submitButton = document.getElementById("submit-btn");
  $submitButton.setAttribute("disabled", "disabled");
  socket.emit(
    "submit",
    {
      name: $name.value,
      message: $message.value,
    },
    (error) => {
      $submitButton.removeAttribute("disabled");
      $name.value = "";
      $message.value = "";
      $name.focus();
      if (error) {
        return console.log(error);
      }
      console.log("Message was delivered!!");
    }
  );
});

$sendLocationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    //disable
    $sendLocationBtn.setAttribute("disabled", "disabled");
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      (message) => {
        //enable
        $sendLocationBtn.removeAttribute("disabled");
        console.log(message);
      }
    );
  });
});
