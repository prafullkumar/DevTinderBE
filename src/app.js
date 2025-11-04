const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ fistname: "Prafull", lastname: "Kumar" });
});

app.post("/user", (req, res) => {
  res.send("User created");
});

app.delete("/user", (req, res) => {
  res.send("User deleted");
});

app.use("/text", (req, res) => {
  res.send("This is a text response.");
});

app.use("/", (req, res, next) => {
  res.send("Hello, World trst!");
  next();
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
