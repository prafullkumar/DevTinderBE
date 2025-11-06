const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Signup logic here

  const signUpdata = req.body;
  try {
    const userData = new User(signUpdata);
    await userData.save();
    res.send("User Data added successfully!!");
  } catch (error) {
    res.status(500).send("Error saving user data");
  }
});

app.get("/users", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
  } catch (error) {
    res.status(500).send("Error fetching users " + error.message);
  }
});

app.get("/feed", async (req, res) => {
  const users = await User.find({});
  try {
    res.json(users);
  } catch (error) {
    res.status(500).send("Error fetching users " + error.message);
  }
});

app.get("/userId", async (req, res) => {
  try {
    const userId = await User.findById(req.body.userID);
    res.send(userId);
  } catch (error) {
    res.status(500).send("Error fetching user by ID " + error.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userID;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting user " + error.message);
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userID;
  const updateData = req.body;
  try {
    await User.findByIdAndUpdate(userId, updateData);
    res.send("User updated successfully");
  } catch (error) {
    res.status(500).send("Error updating user " + error.message);
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
