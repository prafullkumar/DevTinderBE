const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../models/user");

app.use(cookieParser());

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Access Denied. Please logged In.");
    }
    const decodeData = await jwt.verify(token, "devTinder@123");
    const { _id } = decodeData;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Invalid User");
    } else {
      req.user = user;
    }

    next();
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
};
module.exports = userAuth;
