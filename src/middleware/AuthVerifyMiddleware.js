const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.headers["token-key"];

  if (!token) {
    return res.status(401).json({ status: "Unauthorized" });
  }

  jwt.verify(token, "SecretKey123456789", (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: "Unauthorized", data: err });
    } else {
      let username = decoded["data"]["UserName"];
      req.headers.username = username;
      next();
    }
  });
};
