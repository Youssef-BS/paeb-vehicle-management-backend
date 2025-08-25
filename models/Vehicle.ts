import mongoose, { Schema, model, Document } from 'mongoose';

// Interface TypeScript du véhicule
export interface IVehicule extends Document {
  typeVehicule: 'voiture' | 'camion' | 'moto' | 'bus';
  marque: string;
  modele: string;
  dateMiseEnCirculation: Date;
  couleur: string;
  plaqueImmatriculation: string;
  kilometrage: number;
  statut: 'disponible' | 'en-utilisation' | 'en-maintenance' | 'vendu';
  prix: number;
  conducteurs: mongoose.Types.ObjectId[];
  prixVente?: number | null;
  dateVente: Date | null;
  alertDateVisiteTechnique?: Date | null;
}

// Schéma Mongoose du véhicule
const vehiculeSchema: Schema<IVehicule> = new Schema(
  {
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
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    // 🔹 Nouveaux champs
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
    },

   
  },
  {
    timestamps: true,
  }
);

// Export du modèle Mongoose
export const Vehicule = model<IVehicule>('Vehicule', vehiculeSchema);