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
module.exports = { validateSignUpData };
