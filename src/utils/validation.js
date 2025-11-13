const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (
    firstName.length < 4 ||
    firstName.length > 30 ||
    !firstName ||
    typeof firstName !== "string" ||
    /^\s*$/.test(firstName) ||
    !/^[A-Za-z\s]+$/.test(firstName)
  ) {
    throw new Error(
      "Invalid first name. Only letters and spaces allowed, 4–30 characters."
    );
  } else if (typeof lastName !== "string") {
    throw new Error("Enter a valid lastName");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter a valida Email!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a Valid Password");
  }
};
const validateProfileData = (req) => {
  const { firstName, lastName, address, gender, photo, skills, age, about } =
    req.body;

  // 🧩 Required fields check
  if (
    !firstName ||
    !lastName ||
    !address ||
    !gender ||
    !photo ||
    !skills ||
    !age ||
    !about
  ) {
    throw new Error("All fields are required");
  }

  // 🧩 firstName & lastName validation
  if (typeof firstName !== "string" || firstName.trim().length < 2) {
    throw new Error("First name must be at least 2 characters");
  }
  if (typeof lastName !== "string" || lastName.trim().length < 2) {
    throw new Error("Last name must be at least 2 characters");
  }

  // 🧩 Address validation
  if (typeof address !== "string" || address.trim().length < 10) {
    throw new Error("Address must be a string with at least 10 characters");
  }

  // 🧩 Gender validation
  const allowedGenders = ["male", "female", "other"];

  if (!allowedGenders.includes(gender.toLowerCase())) {
    throw new Error("Gender must be one of: male, female, or other");
  }

  // 🧩 Photo URL validation
  const isValidUrl = /^(https?:\/\/[^\s]+)$/i.test(photo);
  if (!isValidUrl) {
    throw new Error("Invalid photo URL");
  }

  // 🧩 Skills validation
  if (!Array.isArray(skills)) {
    throw new Error("Skills must be an array");
  }
  if (skills.length === 0) {
    throw new Error("At least one skill is required");
  }
  if (skills.length > 10) {
    throw new Error("Maximum 10 skills are allowed");
  }
  const allStrings = skills.every(
    (skill) => typeof skill === "string" && skill.trim().length > 0
  );
  if (!allStrings) {
    throw new Error("All skills must be non-empty strings");
  }

  // ✅ If all validations pass:
  // (You can now safely save to DB)
  // const user = new User({ firstName, lastName, address, gender, photo, skills });
  // await user.save();
  const ALLOWED_UPDATES = [
    "firstName",
    "lastName",
    "address",
    "gender",
    "photo",
    "skills",
    "age",
    "about",
  ];
  const isValidData = Object.keys(req.body).every((field) =>
    ALLOWED_UPDATES.includes(field)
  );
  return isValidData;
};

const validateInputPassword = (req) => {
  const { password } = req.body;
  if (!validator.isStrongPassword(password)) {
    throw new Error("Invalid Password Format");
  }
  const Allowad_data = ["password"];
  const isvalidPassword = Object.keys(req.body).every((field) =>
    Allowad_data.includes(field)
  );
  return isvalidPassword;
};
module.exports = {
  validateSignUpData,
  validateProfileData,
  validateInputPassword,
};
