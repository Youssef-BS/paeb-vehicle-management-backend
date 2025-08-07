import  mongoose, {Schema, model , Document} from 'mongoose';

export interface IVehicle extends Document {
    dateAdded: Date;
    vehicleType: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
    kilometrage: number;
    status: "available" | "in-use" | "maintenance";
    drivers: mongoose.Types.ObjectId[];
}


const vehicleSchema: Schema<IVehicle> = new Schema({
    dateAdded: {
        type: Date,
        default: Date.now
    },
    vehicleType: {
        type: String,
        required: true,
        enum: ["car", "truck", "motorcycle", "bus"]
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true,
        min: 1886 
    },
    color: {
        type: String,
        required: true,
        trim: true
    },
    licensePlate: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    kilometrage: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        required: true,
        enum: ["available", "in-use", "maintenance"],
        default: "available"
    },
    drivers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]

})

export const Vehicle = model<IVehicle>("Vehicle", vehicleSchema);