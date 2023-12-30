const { JWT_secert } = require("../config");
const jwt = require("jsonwebtoken");
function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const jwttoken = req.headers.authorization;
  const split_token = jwttoken.split(" ");
  const token = split_token[1];

  const decoded = jwt.verify(token, JWT_secert);
  if (decoded.username) {
    req.username = decoded.username; // extracting the useranme from the sign in or login in info
    next();
  } else {
    // 403 - Unauthorized
    res.status(403).json({
      msg: "Unauthorized Access",
    });
  }
}

module.exports = userMiddleware;
