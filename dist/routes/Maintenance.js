"use strict";
// routes/maintenance.routes
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Maintenance_1 = require("../controllers/Maintenance");
const router = express_1.default.Router();
// ➕ Créer une maintenance
router.post('/', Maintenance_1.createMaintenance);
// 📄 Obtenir toutes les maintenances
router.get('/', Maintenance_1.getAllMaintenances);
// 🔍 Obtenir une maintenance par ID
router.get('/:id', Maintenance_1.getMaintenanceById);
// ✏️ Mettre à jour une maintenance
router.put('/:id', Maintenance_1.updateMaintenance);
// 🗑️ Supprimer une maintenance
router.delete('/:id', Maintenance_1.deleteMaintenance);
exports.default = router;
