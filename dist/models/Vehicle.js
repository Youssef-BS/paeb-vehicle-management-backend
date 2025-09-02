"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicule = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const vehiculeSchema = new mongoose_1.Schema({
    typeVehicule: {
        type: String,
        required: true,
        enum: ['voiture', 'camion', 'moto', 'bus'],
    },
    marque: {
        type: String,
        required: true,
        trim: true,
    },
    modele: {
        type: String,
        required: true,
        trim: true,
    },
    dateMiseEnCirculation: {
        type: Date,
        required: true,
    },
    couleur: {
        type: String,
        required: true,
        trim: true,
    },
    plaqueImmatriculation: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    kilometrage: {
        type: Number,
        required: true,
        min: 0,
    },
    statut: {
        type: String,
        required: true,
        enum: ['disponible', 'en-utilisation', 'en-maintenance', 'vendu'],
        default: 'disponible',
    },
    prix: {
        type: Number,
        required: true,
        min: 0,
    },
    conducteurs: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: 'User',
        },
    ],
    maintenances: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: 'Maintenance',
        },
    ],
    prixVente: {
        type: Number,
        default: null,
    },
    dateVente: {
        type: Date,
        required: false,
    },
    alertDateVisiteTechnique: {
        type: Date,
        required: true,
        default: null,
    },
}, {
    timestamps: true,
});
exports.Vehicule = (0, mongoose_1.model)('Vehicule', vehiculeSchema);
