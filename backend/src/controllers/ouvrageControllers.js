const { OuvrageModel } = require("../../models/ouvrageModel");
const { db } = require("../../database/client");

const Ouvrage = new OuvrageModel(db);

/* get all the ouvrage */
const getAllOuvrage = (req, res) => {
  Ouvrage.readAll()
    .then((ouvrages) => {
      res.json(ouvrages);
    })
    .catch((err) => {
      console.error(err);
    });
};

/* get one ouvrage by id */

const getOuvrageById = (req, res) => {
  Ouvrage.read(req.params.id)
    .then((ouvrage) => {
      res.json(ouvrage);
    })
    .catch((err) => {
      console.err(err);
    });
};

/* create new ouvrage */

const createNewOuvrage = (req, res) => {
  const {
    title,
    language,
    category_id,
    author_id,
    adherent_id,
    pret_id,
    reserve_id,
    coverbook,
  } = req.body;
  Ouvrage.create({
    title,
    language,
    category_id,
    author_id,
    adherent_id,
    pret_id,
    reserve_id,
    coverbook,
  })
    .then((newOuvrage) => {
      res.json(newOuvrage);
    })
    .catch((err) => {
      console.error(err);
    });
};

/* update ouvrage  */

const updateOuvrage = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    title,
    language,
    category_id,
    author_id,
    adherent_id,
    pret_id,
    reserve_id,
    coverbook,
  } = req.body;
  console.log(req.body);
  Ouvrage.update(
    title,
    language,
    category_id,
    author_id,
    adherent_id,
    pret_id,
    reserve_id,
    coverbook,
    id
  )
    .then((updatedOuvrage) => {
      res.json(updatedOuvrage);
    })
    .catch((err) => {
      console.error(err);
    });
};

/* delete ouvrage */

const deleteOuvrage = (req, res) => {
  const id = parseInt(req.params.id);

  Ouvrage.delete(id)
    .then((deleteOne) => {
      res.json(deleteOne);
    })
    .catch((err) => {
      console.error(err);
    });
};

/* get all ouvrage but filtred based on lavel discipline and language  */

const getFiltredOuvrage = (req, res) => {
  Ouvrage.readfiltred()
    .then((filtered) => {
      if (filtered.length === 0) {
        res.status(404).json({ error: "No matching records found" });
      } else {
        res.json(filtered);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
};

/* get all ouvrage but filtred based on lavel discipline and language  */

const getFiltredOuvrageById = (req, res) => {
  const id = parseInt(req.params.id);
  Ouvrage.readfiltredById(id)
    .then((filtered) => {
      if (filtered.length === 0) {
        res.status(404).json({ error: "No matching records found" });
      } else {
        res.json(filtered);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
};

module.exports = {
  getAllOuvrage,
  getOuvrageById,
  createNewOuvrage,
  updateOuvrage,
  deleteOuvrage,
  getFiltredOuvrage,
  getFiltredOuvrageById,
};
