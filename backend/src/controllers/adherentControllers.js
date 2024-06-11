const { AdherentModel } = require("../../models/adherentModel");
const { db } = require("../../database/client");
const jwt = require("jsonwebtoken");

const Adherent = new AdherentModel(db);

// une fonction pour générer les tokens

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
};

// get all the users
const getAllAdherents = (req, res) => {
  Adherent.readAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
    });
};

// get one user by id

const getAdherentById = (req, res) => {
  const id = parseInt(req.params.id);

  Adherent.read(id)
    .then((user) => {
      const token = generateToken({ user });
      res.json({ user, token });
    })
    .catch((err) => {
      console.error(err);
    });
};

const createAdherent = (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  Adherent.create({ firstname, lastname, email, password })
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.error(err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  Adherent.login(email, password)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const token = generateToken(user);
      res.json({ user: email, token });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
};
const logout = (req, res) => {
  res.json({ message: "Successfully logged out" });
};

module.exports = {
  getAllAdherents,
  getAdherentById,
  createAdherent,
  login,
  logout,
};
