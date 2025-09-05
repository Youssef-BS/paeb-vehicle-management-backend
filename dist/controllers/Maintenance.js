"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMaintenance = exports.updateMaintenance = exports.getMaintenanceById = exports.getAllMaintenances = exports.createMaintenance = void 0;
const Maintenance_1 = require("../models/Maintenance");
const Vehicle_1 = require("../models/Vehicle");
// ➕ Créer une nouvelle maintenance
const createMaintenance = async (req, res) => {
    try {
        const { typeMaintenance, vehicule, kilometrage, dateEntretien, detailIntervention, coutTotal, fournisseurPieces, garage, } = req.body;
        // Vérifie si le véhicule existe
        const vehiculeDoc = await Vehicle_1.Vehicule.findById(vehicule);
        if (!vehiculeDoc) {
            return res.status(404).json({ message: 'Véhicule introuvable' });
        }
        const newMaintenance = new Maintenance_1.Maintenance({
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
        vehiculeDoc.maintenances?.push(saved._id);
        await vehiculeDoc.save();
        res.status(201).json(saved);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création', error });
    }
};
exports.createMaintenance = createMaintenance;
// 📄 Obtenir toutes les maintenances
const getAllMaintenances = async (_req, res) => {
    try {
        const maintenances = await Maintenance_1.Maintenance.find().populate('vehicule');
        res.json(maintenances);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
exports.getAllMaintenances = getAllMaintenances;
// 🔍 Obtenir une maintenance par ID
const getMaintenanceById = async (req, res) => {
    try {
        const maintenance = await Maintenance_1.Maintenance.findById(req.params.id).populate('vehicule');
        if (!maintenance) {
            return res.status(404).json({ message: 'Maintenance introuvable' });
        }
        res.json(maintenance);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
exports.getMaintenanceById = getMaintenanceById;
// ✏️ Mettre à jour une maintenance
const updateMaintenance = async (req, res) => {
    try {
        const updated = await Maintenance_1.Maintenance.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) {
            return res.status(404).json({ message: 'Maintenance introuvable' });
        }
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour', error });
    }
};
exports.updateMaintenance = updateMaintenance;
// 🗑️ Supprimer une maintenance
const deleteMaintenance = async (req, res) => {
    try {
        const deleted = await Maintenance_1.Maintenance.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Maintenance introuvable' });
        }
        res.json({ message: 'Maintenance supprimée' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression', error });
    }
};
exports.deleteMaintenance = deleteMaintenance;
