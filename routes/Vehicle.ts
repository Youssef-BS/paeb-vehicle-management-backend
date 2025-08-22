import express from 'express';
import {
  ajouterVehicule,
  obtenirTousLesVehicules,
  obtenirVehiculeParId,
  mettreAJourVehicule,
  supprimerVehicule,
  vendreVehicule
} from '../controllers/Vehicle.ts';

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

router.put('/vendre/:id', vendreVehicule);


export default router;
