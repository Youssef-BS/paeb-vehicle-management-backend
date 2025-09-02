import type { Request, Response } from 'express';
import { Maintenance } from '../models/Maintenance.ts';
import { Vehicule } from '../models/Vehicle.ts'; 
// ➕ Créer une nouvelle maintenance
export const createMaintenance = async (req: Request, res: Response) => {
  try {
    const {
      typeMaintenance,
      vehicule,
      kilometrage,
      dateEntretien,
      detailIntervention,
      coutTotal,
      fournisseurPieces,
      garage,
    } = req.body;

    // Vérifie si le véhicule existe
    const vehiculeDoc = await Vehicule.findById(vehicule);
    if (!vehiculeDoc) {
      return res.status(404).json({ message: 'Véhicule introuvable' });
    }

    const newMaintenance = new Maintenance({
      typeMaintenance,
      vehicule,
      kilometrage,
      dateEntretien,
      detailIntervention,
      coutTotal,
      fournisseurPieces,
      garage,
    });

    const saved = await newMaintenance.save();
    vehiculeDoc.maintenances?.push(saved._id as any);
    await vehiculeDoc.save();
    res.status(201).json(saved);

  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création', error });
  }
};


// 📄 Obtenir toutes les maintenances
export const getAllMaintenances = async (_req: Request, res: Response) => {
  try {
    const maintenances = await Maintenance.find().populate('vehicule');
    res.json(maintenances);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// 🔍 Obtenir une maintenance par ID
export const getMaintenanceById = async (req: Request, res: Response) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id).populate('vehicule');
    if (!maintenance) {
      return res.status(404).json({ message: 'Maintenance introuvable' });
    }
    res.json(maintenance);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// ✏️ Mettre à jour une maintenance
export const updateMaintenance = async (req: Request, res: Response) => {
  try {
    const updated = await Maintenance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: 'Maintenance introuvable' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error });
  }
};

// 🗑️ Supprimer une maintenance
export const deleteMaintenance = async (req: Request, res: Response) => {
  try {
    const deleted = await Maintenance.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Maintenance introuvable' });
    }
    res.json({ message: 'Maintenance supprimée' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error });
  }
};