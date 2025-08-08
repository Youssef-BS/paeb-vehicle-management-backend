import mongoose, { Schema, model, Document } from 'mongoose';

// Interface TypeScript du véhicule
export interface IVehicule extends Document {
  dateAjout: Date;
  typeVehicule: 'voiture' | 'camion' | 'moto' | 'bus';
  marque: string;
  modele: string;
  annee: number;
  couleur: string;
  plaqueImmatriculation: string;
  kilometrage: number;
  statut: 'disponible' | 'en-utilisation' | 'en-maintenance';
  conducteurs: mongoose.Types.ObjectId[];
}

// Schéma Mongoose du véhicule
const vehiculeSchema: Schema<IVehicule> = new Schema(
  {
    dateAjout: {
      type: Date,
      default: Date.now,
    },
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
    annee: {
      type: Number,
      required: true,
      min: 1886,
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
      enum: ['disponible', 'en-utilisation', 'en-maintenance'],
      default: 'disponible',
    },
    conducteurs: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Utilisateur',
      },
    ],
  },
  {
    timestamps: true, // Ajoute automatiquement les champs createdAt et updatedAt
  }
);

// Export du modèle Mongoose
export const Vehicule = model<IVehicule>('Vehicule', vehiculeSchema);
