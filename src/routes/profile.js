const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../midelewares/userAuth");
const bcrypt = require("bcrypt");
const {
  validateProfileData,
  validateInputPassword,
} = require("../utils/validation");
const User = require("../models/user");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

profileRouter.patch("/edit", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const isvalidData = validateProfileData(req);
    if (isvalidData) {
      Object.keys(req.body).forEach((key) => {
        console.log(key);
        loggedInUser[key] = req.body[key];
      });

      await loggedInUser.save();

      res.send(`${loggedInUser.firstName} your profile Updated scuccessfuly!`);
    } else {
      throw new Error("Invalid Profile Data!");
    }
  } catch (err) {
    res.status(400).send("ERROR 123" + err.message);
  }
});

profileRouter.patch("/updatePassword", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const isvalidPassword = validateInputPassword(req);

    if (isvalidPassword) {
      const enncryptpass = await bcrypt.hash(req.body.password, 10);
      Object.keys(req.body).forEach(
        (key) => (loggedInUser[key] = enncryptpass)
      );
      loggedInUser.save();
      res.send("Passward update in progress!");
    } else {
      throw new Error("Invalid password request");
    }
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});
module.exports = profileRouter;
