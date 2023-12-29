// Middleware for handling auth
const jwt = require("jsonwebtoken");
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const jwttoken = req.headers.authorization;
  const split_token = jwttoken.split(" ");
  const token = token[1];

  const decoded = jwt.verify(token, JWT_secert);
  if (decoded.username) {
    next();
  } else {
    // 403 - Unauthorized
    res.status(403).json({
      msg: "Unauthorized Access",
    });
  }
}

module.exports = adminMiddleware;
