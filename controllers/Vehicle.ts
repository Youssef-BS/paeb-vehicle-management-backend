import type { Request, Response } from 'express';
import { Vehicule } from '../models/Vehicle.ts';
import mongoose from 'mongoose';

// ➕ Créer un véhicule
export const ajouterVehicule = async (req: Request, res: Response) => {
  try {
    const nouveauVehicule = new Vehicule(req.body);
    const vehiculeSauvegarde = await nouveauVehicule.save();
    res.status(201).json(vehiculeSauvegarde);
  } catch (err) {
    res.status(400).json({
      message: 'Erreur lors de la création du véhicule',
      error: err,
    });
  }
};

// 📄 Obtenir tous les véhicules
export const obtenirTousLesVehicules = async (_req: Request, res: Response) => {
  try {
    const vehicules = await Vehicule.find().populate('conducteurs'); // ✅ correction ici
    res.status(200).json(vehicules);
  } catch (err) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des véhicules',
      error: err,
    });
  }
};

// 🔍 Obtenir un véhicule par ID
export const obtenirVehiculeParId = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  try {
    const vehicule = await Vehicule.findById(id).populate('conducteurs'); // ✅ correction ici
    if (!vehicule) {
      return res.status(404).json({ message: 'Véhicule non trouvé' });
    }
    res.status(200).json(vehicule);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};

// ✏️ Mettre à jour un véhicule
export const mettreAJourVehicule = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  try {
    const vehiculeMisAJour = await Vehicule.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!vehiculeMisAJour) {
      return res.status(404).json({ message: 'Véhicule non trouvé' });
    }
    res.status(200).json(vehiculeMisAJour);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: err });
  }
};

// 🗑️ Supprimer un véhicule
export const supprimerVehicule = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  try {
    const vehiculeSupprime = await Vehicule.findByIdAndDelete(id);
    if (!vehiculeSupprime) {
      return res.status(404).json({ message: 'Véhicule non trouvé' });
    }
    res.status(200).json({ message: 'Véhicule supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: err });
  }
};