import express from 'express';
import {
  ajouterVehicule,
  obtenirTousLesVehicules,
  obtenirVehiculeParId,
  mettreAJourVehicule,
  supprimerVehicule,
  vendreVehicule,
  obtenirAlertesVisiteTechnique
} from '../controllers/Vehicle';

const router = express.Router();

// Ajouter un véhicule
router.post('/', ajouterVehicule);

// Obtenir tous les véhicules
router.get('/', obtenirTousLesVehicules);

// Obtenir un véhicule par ID
router.get('/:id', obtenirVehiculeParId);

// Mettre à jour un véhicule
router.put('/:id', mettreAJourVehicule);

// Supprimer un véhicule
router.delete('/:id', supprimerVehicule);

// Vendre un véhicule
router.put('/vendre/:id', vendreVehicule);

// routes/vehiculeRoutes
router.get("/alertes/visite-technique", obtenirAlertesVisiteTechnique);


export default router;
