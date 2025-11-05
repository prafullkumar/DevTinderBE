const mongoose = require("mongoose");

const user = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  pasaword: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("user", user);
