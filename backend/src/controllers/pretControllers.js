const { PretModel } = require("../../models/pretModel");
const { db } = require("../../database/client");

const Pret = new PretModel(db);

/* get all the pret */
const getAllPret = (req, res) => {
  Pret.readAll()
    .then((pret) => {
      res.json(pret);
    })
    .catch((err) => {
      console.error(err);
    });
};

/* get one pret by id */

const getPretById = (req, res) => {
  Pret.read(req.params.id)
    .then((pret) => {
      res.json(pret);
    })
    .catch((err) => {
      console.err(err);
    });
};

/* create new pret */

const createNewPret = (req, res) => {
  const { output_date, input_date, islended } = req.body;
  Pret.create({
    output_date,
    input_date,
    islended,
  })
    .then((newPret) => {
      res.json(newPret);
    })
    .catch((err) => {
      console.error(err);
    });
};

/* update pret  */

const updatePret = (req, res) => {
  const id = parseInt(req.params.id);
  const { output_date, input_date, islended } = req.body;
  Pret.update(output_date, input_date, islended, id)
    .then((updatedOuvrage) => {
      res.json(updatedOuvrage);
    })
    .catch((err) => {
      console.error(err);
    });
};

/* delete pret */

const deletePret = (req, res) => {
  const id = parseInt(req.params.id);

  Pret.delete(id)
    .then((deleteOne) => {
      res.json(deleteOne);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  getAllPret,
  getPretById,
  createNewPret,
  updatePret,
  deletePret,
};
