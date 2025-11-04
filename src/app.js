const express = require("express");

const app = express();

app.use("/user", [
  (req, res, next) => {
    res.send("Users endpoint1");
    next();
  },
  (req, res, next) => {
    console.log("This always runs after the first middleware");

    next();
    res.send("Users endpoint2");
  },
  (req, res) => {
    console.log("This always runs after the second middleware");
    res.send("Users endpoint3");
  },
]);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
