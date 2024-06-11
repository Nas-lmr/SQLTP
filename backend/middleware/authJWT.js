const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
  
    console.log(decoded,"RRRRRRRRRRR");
    if (err) {
      return res.status(401).json({ error: "Request is not Authorized" });
    }

    req.user = decoded;
    console.log(decoded,"AFTER");
    next();
  });
};

module.exports = verifyToken;
