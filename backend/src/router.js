const express = require("express");

const router = express.Router();

const ouvrage = require("./controllers/ouvrageControllers");
const adherent = require("./controllers/adherentControllers");
const user = require("./controllers/userControllers");
const userMiddleware = require("../middleware/authJWT");
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

/* user  */

router.get("/user", user.getAllUsers);
router.get("/user/:id", user.getUserById);
router.post("/login", user.login);
router.post("/user", userMiddleware, user.createUser);

module.exports = router;
