import express from "express";
import {
  ajouterVehicule,
  obtenirVehicules,
  obtenirVehiculeParId,
  mettreAJourVehicule,
  supprimerVehicule,
} from "../controllers/Vehicle.ts";

const router = express.Router();

router.post("/", ajouterVehicule);
router.get("/", obtenirVehicules);
router.get("/:id", obtenirVehiculeParId);
router.put("/:id", mettreAJourVehicule);
router.delete("/:id", supprimerVehicule);

export default router;
