const isAdminAuthorized = (req, res, next) => {
  const authToken = "12345678";
  // const isAdminAuthorized = authToken === "12345678";
  if (authToken === "12345678") {
    next();
  } else {
    res.status(401).send("You are not admin");
  }
};

module.exports = { isAdminAuthorized };
