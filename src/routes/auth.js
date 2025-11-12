const express = require("express");
const authRouter = express.Router();
const validator = require("validator");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  // Signup logic here
  try {
    validateSignUpData(req);
    const { firstName, lastName, email, password, gender, skills, photo } =
      req.body;
    const enncryptpass = await bcrypt.hash(password, 10);

    const userData = new User({
      firstName,
      lastName,
      email,
      gender,
      skills,
      photo,
      password: enncryptpass,
    });
    await userData.save();
    res.send("User Data added successfully!!");
  } catch (error) {
    res.status(500).send("Error saving user data" + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!validator.isEmail(email)) {
      throw new Error("Invalid Email Id !");
    }
    const userData = await User.findOne({ email });

    if (!userData) {
      throw new Error("Invalid Credential");
    }
    const isvalidPassword = await userData.validatePassword(password);

    if (isvalidPassword) {
      const token = await userData.getJwtToken();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // cookie will be removed after 8 hours
      });
      res.send(userData);
    } else {
      throw new Error("Invalid Credential!");
    }
  } catch (err) {
    res.status(401).json({ error: err.message, status: 401 });
  }
});

authRouter.delete("/user", async (req, res) => {
  const userId = req.body.userID;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting user " + error.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res
    .status(200)
    .cookie("token", null, { expires: new Date(Date.now()) })
    .json({ status: 200, message: "Logged out successfully" });
});

module.exports = authRouter;
