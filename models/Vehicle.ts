import mongoose, { Schema, model, Document } from 'mongoose';

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
  maintenances?: mongoose.Types.ObjectId[];
  prixVente?: number | null;
  dateVente?: Date | null;
 }


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
    maintenances: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Maintenance',
      },
    ],

     
    prixVente: {
      type: Number,
      default: null,
    },
     dateVente: {
      type: Date,
      default: null,
    },

   
  },
  {
    timestamps: true,
  }
);

export const Vehicule = model<IVehicule>('Vehicule', vehiculeSchema);