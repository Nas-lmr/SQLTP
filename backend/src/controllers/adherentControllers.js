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

module.exports = {
  getAllAdherents,
  getAdherentById,
};
