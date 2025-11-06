const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
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
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      validate(value) {
        if (!isEmail(value)) {
          throw new Error("Enter Valid Email !!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Invalida error Format");
        }
      },
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
      type: Array,
      validate(value) {
        if (
          !(
            Array.isArray(value) &&
            value.every((skill) => typeof skill === "string")
          )
        ) {
          throw new Error("Enter a Valid skill");
        }
      },
    },

    photo: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL");
        }
      },
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("user", user);
