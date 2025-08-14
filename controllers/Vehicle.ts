import type { Request, Response } from "express";
import { Vehicule } from "../models/Vehicle.ts";

// ➕ Ajouter un véhicule
export const ajouterVehicule = async (req: Request, res: Response) => {
  try {
    const data = {
      ...req.body,
      conducteurs: Array.isArray(req.body.conducteurs) ? req.body.conducteurs : [],
    };

    const nouveauVehicule = new Vehicule(data);
    const vehiculeSauvegarde = await nouveauVehicule.save();

    res.status(201).json(vehiculeSauvegarde);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de l'ajout du véhicule",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// 📄 Obtenir tous les véhicules
export const obtenirVehicules = async (_req: Request, res: Response) => {
  try {
    const vehicules = await Vehicule.find().populate("conducteurs");
    res.status(200).json(vehicules);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des véhicules",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// 🔍 Obtenir un véhicule par ID
export const obtenirVehiculeParId = async (req: Request, res: Response) => {
  try {
    const vehicule = await Vehicule.findById(req.params.id).populate("conducteurs");
    if (!vehicule) {
      return res.status(404).json({ message: "Véhicule non trouvé" });
    }
    res.status(200).json(vehicule);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération du véhicule",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// ✏️ Mettre à jour un véhicule
export const mettreAJourVehicule = async (req: Request, res: Response) => {
  try {
    const data = {
      ...req.body,
      conducteurs: Array.isArray(req.body.conducteurs) ? req.body.conducteurs : [],
    };

    const vehicule = await Vehicule.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!vehicule) {
      return res.status(404).json({ message: "Véhicule non trouvé" });
    }
    res.status(200).json(vehicule);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du véhicule",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// 🗑️ Supprimer un véhicule
export const supprimerVehicule = async (req: Request, res: Response) => {
  try {
    const vehicule = await Vehicule.findByIdAndDelete(req.params.id);
    if (!vehicule) {
      return res.status(404).json({ message: "Véhicule non trouvé" });
    }
    res.status(200).json({ message: "Véhicule supprimé avec succès" });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la suppression du véhicule",
      error: err instanceof Error ? err.message : err,
    });
  }
};
