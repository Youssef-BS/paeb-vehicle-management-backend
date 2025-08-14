import mongoose, { Schema, model, Document } from 'mongoose';

export interface IMaintenance extends Document {
  typeMaintenance: 'entretien' | 'réparation';
  vehicule: mongoose.Types.ObjectId;
  kilometrage: number;
  dateEntretien: Date;
  detailIntervention: string;
  coutTotal: number;
  fournisseurPieces: string;
  garage: string;
}

const maintenanceSchema: Schema<IMaintenance> = new Schema(
  {
    typeMaintenance: {
      type: String,
      required: true,
      enum: ['entretien', 'réparation'],
    },
    vehicule: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

export const Maintenance = model<IMaintenance>('Maintenance', maintenanceSchema);