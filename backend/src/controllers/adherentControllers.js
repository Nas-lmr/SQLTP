const { AdherentModel } = require("../../models/adherentModel");
const { db } = require("../../database/client");
const jwt = require("jsonwebtoken");

const Adherent = new AdherentModel(db);

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
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
    });
};
const createAdherent = (req, res) => {
  const { firstname, lastname, role_id } = req.body;

  Adherent.create({firstname, lastname, role_id})
    .then((Adh) => {
      res.json(Adh);
    })
    .catch((err) => console.error(err));
};

// update adherent

const updateAdherent = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, role_id } = req.body;
  Adherent.update(firstname, lastname, role_id, id)
    .then((updatedAdh) => {
      res.json(updatedAdh);
    })
    .catch((err) => {
      console.error(err);
    });
};

/* delete adherent */

const deleteAdherent = (req, res) => {
  const id = parseInt(req.params.id);

  Adherent.delete(id)
    .then((deleteOne) => {
      res.json(deleteOne);
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
