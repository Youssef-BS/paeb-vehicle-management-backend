"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Vehicle_ts_1 = require("../controllers/Vehicle");
const router = express_1.default.Router();
// Ajouter un véhicule
router.post('/', Vehicle_ts_1.ajouterVehicule);
// Obtenir tous les véhicules
router.get('/', Vehicle_ts_1.obtenirTousLesVehicules);
// Obtenir un véhicule par ID
router.get('/:id', Vehicle_ts_1.obtenirVehiculeParId);
// Mettre à jour un véhicule
router.put('/:id', Vehicle_ts_1.mettreAJourVehicule);
// Supprimer un véhicule
router.delete('/:id', Vehicle_ts_1.supprimerVehicule);
// Vendre un véhicule
router.put('/vendre/:id', Vehicle_ts_1.vendreVehicule);
// routes/vehiculeRoutes
router.get("/alertes/visite-technique", Vehicle_ts_1.obtenirAlertesVisiteTechnique);
exports.default = router;
