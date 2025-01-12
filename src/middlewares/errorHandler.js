class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; //yaa sanitization error handle ke liye maan skte hai  Identify operational errors (vs programming errors)
    // this.sanitizationOperation = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Handle known operational errors
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Handle unknown errors
  res.status(500).json({
    success: false,
    message: "Something went wrong! Please try again later.",
  });
};

module.exports = errorHandler;

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new AppError("First name and last name are required", 400);
  } else if (firstName.length < 5 || firstName.length > 70) {
    throw new AppError("First name should be between 5 and 70 characters", 400);
  } else if (!validator.isEmail(emailId)) {
    throw new AppError("Invalid email address", 400);
  } else if (!validator.isStrongPassword(password)) {
    throw new AppError("Password should be strong", 400);
  }
};
