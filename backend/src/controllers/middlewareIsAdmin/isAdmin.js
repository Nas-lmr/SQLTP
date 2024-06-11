function isAdmin(req, res, next) {
  if (req.user && req.user.userRole === "Admin") {

    return next();
  } else {
    return res.status(403).json({ message: "Accès refusé. Admins seulement." });
  }
}

module.exports = isAdmin;
