const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 30,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    pasaword: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,

      required: true,

      validate(value) {
        if (!["Male", "Female", "Other"].includes(value)) {
          throw new Error("Invalid gender value");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", user);
