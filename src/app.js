const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Signup logic here

  const signUpdata = req.body;
  try {
    if (
      signUpdata.firstName.length < 4 ||
      signUpdata.firstName.length > 30 ||
      !signUpdata.firstName ||
      typeof signUpdata.firstName !== "string" ||
      /^\s*$/.test(signUpdata.firstName) ||
      !/^[A-Za-z\s]+$/.test(signUpdata.firstName)
    ) {
      return res
        .status(400)
        .send(
          "Invalid first name. Only letters and spaces allowed, 4–30 characters."
        );
    }
    const userData = new User(signUpdata);
    await userData.save();
    res.send("User Data added successfully!!");
  } catch (error) {
    res.status(500).send("Error saving user data" + error.message);
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

app.patch("/user/:userID", async (req, res) => {
  const userId = req.params.userID;
  const updateData = req.body;
  const ALLOWED_UPDATES = [
    "firstName",
    "lastName",
    "gender",
    "age",
    "city",
    "address",
    "skills",
  ];

  try {
    if (
      req.body.firstName.length < 4 ||
      req.body.firstName.length > 30 ||
      !req.body.firstName ||
      typeof req.body.firstName !== "string" ||
      /^\s*$/.test(req.body.firstName) ||
      !/^[A-Za-z\s]+$/.test(req.body.firstName)
    ) {
      return res
        .status(400)
        .send(
          "Invalid first name. Only letters and spaces allowed, 4–30 characters."
        );
    }
    if (req.body.skills.length > 5) {
      return res.status(400).send("Skills cannot be more than 5");
    }
    const isValidateOperation = Object.keys(updateData).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isValidateOperation) {
      return res.status(400).send("Invalid updates!");
    }
    await User.findByIdAndUpdate(userId, updateData, { runValidators: true });
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
