const express = require("express");

const router = express.Router();

const ouvrage = require("./controllers/ouvrageControllers");
const adherent = require("./controllers/adherentControllers");
const verifyToken = require("../middleware/authJWT");
const isAdmin = require("../middleware/isAdmin");

//***********ADHERENT ROUTES***************//
/* basic CRUD */
router.get("/ouvrage", ouvrage.getAllOuvrage);
router.get("/ouvrage/:id", ouvrage.getOuvrageById);

/* condition  CRUD */

router.get("/filteredouvrage", ouvrage.getFiltredOuvrage);
router.get("/filteredouvrage/:id", ouvrage.getFiltredOuvrageById);

router.post("/login", adherent.login);
router.post("/logout", adherent.logout);
router.post("/register", adherent.createAdherent);

//***********ADMIN ROUTES***************//

//***************OUVRAGES**********//
router.post("/ouvrage", verifyToken, isAdmin, ouvrage.createNewOuvrage);
router.put("/ouvrage/:id", verifyToken, isAdmin, ouvrage.updateOuvrage);
router.delete("/ouvrage/:id", verifyToken, isAdmin, ouvrage.deleteOuvrage);

//*********ADHERENT*******//
router.get("/adherent", verifyToken, isAdmin, adherent.getAllAdherents);
router.get("/adherent/:id", verifyToken, isAdmin, adherent.getAdherentById);

module.exports = router;
