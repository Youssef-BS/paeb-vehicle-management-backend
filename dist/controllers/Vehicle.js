"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenirAlertesVisiteTechnique = exports.vendreVehicule = exports.supprimerVehicule = exports.mettreAJourVehicule = exports.obtenirVehiculeParId = exports.obtenirTousLesVehicules = exports.ajouterVehicule = void 0;
const Vehicle_ts_1 = require("../models/Vehicle");
const Maintenance_ts_1 = require("../models/Maintenance");
const mongoose_1 = __importDefault(require("mongoose"));
// ➕ Ajouter un véhicule
const ajouterVehicule = async (req, res) => {
    try {
        const { typeVehicule, marque, modele, dateMiseEnCirculation, couleur, plaqueImmatriculation, kilometrage, statut, prix, conducteurs, alertDateVisiteTechnique } = req.body;
        // Vérification manuelle de certains champs obligatoires
        if (!typeVehicule || !marque || !modele || !dateMiseEnCirculation || !couleur || !plaqueImmatriculation || prix === undefined) {
            return res.status(400).json({ message: 'Champs obligatoires manquants' });
        }
        const nouveauVehicule = new Vehicle_ts_1.Vehicule({
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
    }
    catch (err) {
        res.status(400).json({
            message: 'Erreur lors de la création du véhicule',
            error: err,
        });
    }
};
exports.ajouterVehicule = ajouterVehicule;
// 📋 Récupérer tous les véhicules
const obtenirTousLesVehicules = async (_req, res) => {
    try {
        const vehicules = await Vehicle_ts_1.Vehicule.find()
            .populate('conducteurs')
            .populate('maintenances');
        const vehiculesWithCout = vehicules.map(v => {
            // S'assurer que coutTotal est un nombre
            const totalCoutMaintenance = v.maintenances.reduce((acc, maintenance) => acc + (Number(maintenance.coutTotal) || 0), 0);
            return {
                ...v.toObject(),
                totalCoutMaintenance,
            };
        });
        res.status(200).json(vehiculesWithCout);
    }
    catch (err) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des véhicules',
            error: err,
        });
    }
};
exports.obtenirTousLesVehicules = obtenirTousLesVehicules;
// 🔎 Récupérer un véhicule par ID
const obtenirVehiculeParId = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID invalide' });
    }
    try {
        const vehicule = await Vehicle_ts_1.Vehicule.findById(id)
            .populate('conducteurs')
            .populate('maintenances');
        if (!vehicule) {
            return res.status(404).json({ message: 'Véhicule non trouvé' });
        }
        // ✅ Calcul du coût total des maintenances
        const totalCoutMaintenance = vehicule.maintenances.reduce((acc, maintenance) => acc + (Number(maintenance.coutTotal) || 0), 0);
        res.status(200).json({
            ...vehicule.toObject(),
            totalCoutMaintenance,
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Erreur lors de la récupération du véhicule',
            error: err,
        });
    }
};
exports.obtenirVehiculeParId = obtenirVehiculeParId;
// ✏️ Mettre à jour un véhicule
const mettreAJourVehicule = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID invalide' });
    }
    try {
        const vehiculeMisAJour = await Vehicle_ts_1.Vehicule.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!vehiculeMisAJour) {
            return res.status(404).json({ message: 'Véhicule non trouvé' });
        }
        res.status(200).json(vehiculeMisAJour);
    }
    catch (err) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour', error: err });
    }
};
exports.mettreAJourVehicule = mettreAJourVehicule;
// ❌ Supprimer un véhicule
const supprimerVehicule = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID invalide' });
    }
    try {
        const vehiculeSupprime = await Vehicle_ts_1.Vehicule.findByIdAndDelete(id, {
            pre: async function (next) {
                await Maintenance_ts_1.Maintenance.deleteMany({ vehicule: this._id });
                next();
            }
        });
        if (!vehiculeSupprime) {
            return res.status(404).json({ message: 'Véhicule non trouvé' });
        }
        res.status(200).json({ message: 'Véhicule supprimé avec succès' });
    }
    catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression', error: err });
    }
};
exports.supprimerVehicule = supprimerVehicule;
// 🟢 Vendre un véhicule
const vendreVehicule = async (req, res) => {
    const { id } = req.params;
    const { prixVente, dateVente } = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID invalide' });
    }
    if (prixVente === undefined || !dateVente) {
        return res.status(400).json({ message: 'Prix de vente et date de vente obligatoires' });
    }
    try {
        const vehiculeMisAJour = await Vehicle_ts_1.Vehicule.findByIdAndUpdate(id, {
            prixVente,
            dateVente,
            statut: 'vendu',
        }, { new: true, runValidators: true });
        if (!vehiculeMisAJour) {
            return res.status(404).json({ message: 'Véhicule non trouvé' });
        }
        res.status(200).json(vehiculeMisAJour);
    }
    catch (err) {
        res.status(500).json({ message: 'Erreur lors de la vente du véhicule', error: err });
    }
};
exports.vendreVehicule = vendreVehicule;
const obtenirAlertesVisiteTechnique = async (_req, res) => {
    try {
        // ✅ Start of today (local)
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        // ✅ End of the day 7 days later
        const endDate = new Date();
        endDate.setDate(startOfToday.getDate() + 7);
        endDate.setHours(23, 59, 59, 999);
        // 🔍 Find vehicles with alertDateVisiteTechnique within the next 7 days and not sold
        const vehicules = await Vehicle_ts_1.Vehicule.find({
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
    }
    catch (err) {
        res.status(500).json({
            message: "Erreur lors de la récupération des alertes",
            error: err,
        });
    }
};
exports.obtenirAlertesVisiteTechnique = obtenirAlertesVisiteTechnique;
