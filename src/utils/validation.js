const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("firstName and lastName both is required");
  } else if (firstName < 5 || firstName > 70) {
    throw new Error("firstName should be between 5 and 70");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password should be strong");
  }
};

module.exports = { validateSignUpData };
