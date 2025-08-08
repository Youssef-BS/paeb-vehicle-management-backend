// routes/maintenance.routes.ts

import express from 'express';
import {
  createMaintenance,
  getAllMaintenances,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance,
} from '../controllers/Maintenance.ts';

const router = express.Router();

// ➕ Créer une maintenance
router.post('/', createMaintenance);

// 📄 Obtenir toutes les maintenances
router.get('/', getAllMaintenances);

// 🔍 Obtenir une maintenance par ID
router.get('/:id', getMaintenanceById);

// ✏️ Mettre à jour une maintenance
router.put('/:id', updateMaintenance);

// 🗑️ Supprimer une maintenance
router.delete('/:id', deleteMaintenance);

export default router;
