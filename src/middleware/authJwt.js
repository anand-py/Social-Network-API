const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No Token Provided!"
    });
  }
  jwt.verify(token, process.env.SECERET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized"
      });
    }
    console.log(decoded)
    req.userData = { userId: decoded.userId }; // Corrected to use decoded.userId
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken
};

module.exports = authJwt;