const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const { username, password } = req.body;

  console.log(req.session.isLoggedIn);

  try {
    const encryptedPass = await bcrypt.hash(password, 12);

    console.log("encrypted password is ==> " + encryptedPass);

    res.json({
      message: "user created successfully",
    });
  } catch (err) {
    next(new Error(err.message));
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const encryptedPass = await bcrypt.hash(password, 12);

    /*  const cookie = req.get("Cookie");
    if (cookie) {
      //console.log(cookie);
      const isLoggedIn = cookie.split("=")[1];

      if (isLoggedIn) {
        return res.json({
          message: "already logged in",
        });
      }
    }*/

    const result = await bcrypt.compare(password, encryptedPass);

    if (result) {
      //res.setHeader("Set-Cookie", "loggedIn=true");
      //req.session.isLoggedIn = true;
      const token = jwt.sign(
        { username: username, password: encryptedPass },
        "thisisasecretusedtoencryptthetoken",
        { expiresIn: "1h" }
      );
      res.json({
        token: token,
        message: "user logged in",
      });
    } else {
      res.json({
        message: "passwords dont match",
      });
    }
  } catch (err) {
    next(new Error(err.message));
  }
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(req.session);
    res.json({
      message: "session has been destroyed",
    });
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      return res.json({
        message: "error occured",
      });
    }
    const token = buffer.toString("hex");
  });
};
