const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  // Signup logic here

  const signUpdata = {
    firstName: "Kumar",
    lastName: "Tupe",
    email: "kumartupe@gmail.com",
    pasaword: "password123",
    address: "Nashik",
  };
  try {
    const userData = new User(signUpdata);
    await userData.save();
    res.send("User Data added successfully!!");
  } catch (error) {
    res.status(500).send("Error saving user data");
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
