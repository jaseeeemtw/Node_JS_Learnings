const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  try {
    const decodedToken = jwt.verify(
      token,
      "thisisasecretusedtoencryptthetoken"
    );
    if (!decodedToken) {
      const err = new Error("invalid token");
      next(err);
    }
    const userName = decodedToken.username;
    console.log(userName);
  } catch (err) {
    next(err);
  }

  next();
};
