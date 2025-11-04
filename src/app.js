const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
  res.send("Hello, World trst!");
  next();
});
app.get("/text", (req, res) => {
  res.send("This is a text response.");
});
app.get("/hello", (req, res) => {
  res.send("Hello from /hello route!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
