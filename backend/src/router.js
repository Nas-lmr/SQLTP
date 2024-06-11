const express = require("express");

const router = express.Router();

const ouvrage = require("./controllers/ouvrageControllers");
const adherent = require("./controllers/adherentControllers");
const user = require("./controllers/userControllers");
const userMiddleware = require("../middleware/authJWT");
const isAdmin = require("./controllers/middlewareIsAdmin/isAdmin");
const Pret = require("./controllers/pretControllers");

/* basic CRUD */
router.get("/ouvrage", ouvrage.getAllOuvrage);
router.get("/ouvrage/:id", ouvrage.getOuvrageById);
router.post("/ouvrage", ouvrage.createNewOuvrage);
router.put("/ouvrage/:id", ouvrage.updateOuvrage);
router.delete("/ouvrage/:id", ouvrage.deleteOuvrage);

/* condition  CRUD */

router.get("/filteredouvrage", ouvrage.getFiltredOuvrage);
router.get("/filteredouvrage/:id", ouvrage.getFiltredOuvrageById);

/* adherent router  */

router.get("/adherent", adherent.getAllAdherents);
router.get("/adherent/:id", adherent.getAdherentById);
router.post("/adherent", adherent.createAdherent);
router.put("/adherent/:id", adherent.updateAdherent);
router.delete("/adherent/:id", adherent.deleteAdherent);
/* user  */

router.get("/user", user.getAllUsers);
router.get("/user/:id", user.getUserById);
router.post("/login", user.login);
router.post("/user", userMiddleware, isAdmin, user.createUser);
router.put("/user/:id", user.updateUser);
router.delete("/user/:id", userMiddleware, user.deletUser);

/* pret crud */

router.get("/pret", Pret.getAllPret);

module.exports = router;
