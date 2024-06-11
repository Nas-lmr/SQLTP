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

module.exports = {
  getAllAdherents,
  getAdherentById,
  createAdherent,
  updateAdherent,
  deleteAdherent
};
