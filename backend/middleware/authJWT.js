const jwt = require("jsonwebtoken");

const userMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Request is not Authorized" });
    }
    req.user = {
      userID: decoded.user.userId,
      userEmail: decoded.user.userEmail,
      userRole: decoded.user.userRole,
    };
    next();
  });
};

module.exports = userMiddleware;
