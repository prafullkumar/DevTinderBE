const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./midelewares/adminAuth");

app.use("/admin", adminAuth);

app.get("/admin/getUserData", (req, res) => {
  res.send("All User Data");
});

app.post("/admin/createUser", (req, res) => {
  res.send("User Created");
});
app.use("/user", userAuth, (req, res, next) => {
  res.send("Users endpoint1");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
