import type { Request, Response } from 'express';
import { Vehicule } from '../models/Vehicle.ts';
import mongoose from 'mongoose';

// ➕ Ajouter un véhicule
export const ajouterVehicule = async (req: Request, res: Response) => {
  try {
    const { 
      typeVehicule,
      marque,
      modele,
      dateMiseEnCirculation,
      couleur,
      plaqueImmatriculation,
      kilometrage,
      statut,
      prix,
      conducteurs,
      alertDateVisiteTechnique
    } = req.body;

    // Vérification manuelle de certains champs obligatoires
    if (!typeVehicule || !marque || !modele || !dateMiseEnCirculation || !couleur || !plaqueImmatriculation || prix === undefined) {
      return res.status(400).json({ message: 'Champs obligatoires manquants' });
    }

    const nouveauVehicule = new Vehicule({
      typeVehicule,
      marque,
      modele,
      dateMiseEnCirculation,
      couleur,
      plaqueImmatriculation,
      kilometrage,
      statut,
      prix,
      conducteurs,
      alertDateVisiteTechnique
    });

    const vehiculeSauvegarde = await nouveauVehicule.save();
    res.status(201).json(vehiculeSauvegarde);
  } catch (err) {
    res.status(400).json({
      message: 'Erreur lors de la création du véhicule',
      error: err,
    });
  }
};

// 📋 Récupérer tous les véhicules
export const obtenirTousLesVehicules = async (_req: Request, res: Response) => {
  try {
    const vehicules = await Vehicule.find().populate('conducteurs');
    res.status(200).json(vehicules);
  } catch (err) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des véhicules',
      error: err,
    });
  }
};

// 🔎 Récupérer un véhicule par ID
export const obtenirVehiculeParId = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  try {
    const vehicule = await Vehicule.findById(id).populate('conducteurs');
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
    const vehiculeMisAJour = await Vehicule.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!vehiculeMisAJour) {
      return res.status(404).json({ message: 'Véhicule non trouvé' });
    }
    res.status(200).json(vehiculeMisAJour);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: err });
  }
};

// ❌ Supprimer un véhicule
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

}





// 🟢 Vendre un véhicule
export const vendreVehicule = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { prixVente, dateVente } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  if (prixVente === undefined || !dateVente) {
    return res.status(400).json({ message: 'Prix de vente et date de vente obligatoires' });
  }

  try {
    const vehiculeMisAJour = await Vehicule.findByIdAndUpdate(
      id,
      {
        prixVente,
        dateVente,
        statut: 'vendu',
      },
      { new: true, runValidators: true }
    );

    if (!vehiculeMisAJour) {
      return res.status(404).json({ message: 'Véhicule non trouvé' });
    }

    res.status(200).json(vehiculeMisAJour);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la vente du véhicule', error: err });
  }
};








export const obtenirAlertesVisiteTechnique = async (_req: Request, res: Response) => {
  try {
    // ✅ Start of today (local)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // ✅ End of the day 7 days later
    const endDate = new Date();
    endDate.setDate(startOfToday.getDate() + 7);
    endDate.setHours(23, 59, 59, 999);

    // 🔍 Find vehicles with alertDateVisiteTechnique within the next 7 days and not sold
    const vehicules = await Vehicule.find({
      alertDateVisiteTechnique: { $gte: startOfToday, $lte: endDate },
      statut: { $ne: 'vendu' }
    });

    // Map backend fields to frontend-friendly names
    const alerts = vehicules.map(v => ({
      _id: v._id,
      marque: v.marque,
      modele: v.modele,
      plaqueImmatriculation: v.plaqueImmatriculation,
      dateVisiteTechnique: v.alertDateVisiteTechnique
    }));

    res.status(200).json(alerts);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des alertes",
      error: err,
    });
  }
};
