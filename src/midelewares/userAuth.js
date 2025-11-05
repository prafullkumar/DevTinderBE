const userAuth = (req, res, next) => {
  var authTokern = "xyz"; //fetch from req headers in real scenario
  if (authTokern === "xyz") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
  next();
};

module.exports = userAuth;
