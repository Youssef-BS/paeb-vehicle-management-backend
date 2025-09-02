"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maintenance = void 0;
const mongoose_1 = require("mongoose");
const maintenanceSchema = new mongoose_1.Schema({
    typeMaintenance: {
        type: String,
        required: true,
        enum: ['entretien', 'réparation'],
    },
    vehicule: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Vehicule',
        required: true,
    },
    kilometrage: {
        type: Number,
        required: true,
        min: 0,
    },
    dateEntretien: {
        type: Date,
        required: true,
    },
    detailIntervention: {
        type: String,
        required: true,
        trim: true,
    },
    coutTotal: {
        type: Number,
        required: true,
        min: 0,
    },
    fournisseurPieces: {
        type: String,
        trim: true,
    },
    garage: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});
exports.Maintenance = (0, mongoose_1.model)('Maintenance', maintenanceSchema);
