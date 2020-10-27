const express = require("express");
const app = express();
const port = process.env.PORT || 6000;
const path = require("path");
const publicDirectory = path.join(__dirname, "../public");

app.use(express.static(publicDirectory));

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
