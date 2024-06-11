const isAdmin = (req, res, next) => {
  if (
    req.user &&
    req.user.adherent &&
    req.user.adherent.adherentRole === "Admin"
  ) {
    console.log(req.user.adherent.adherentRole, "DANS LE MIDDLWARE ISADMIN");
    next();
  } else {
    res.status(403).json({ error: "Not admin" });
  }
};

module.exports = isAdmin;
