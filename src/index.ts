import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDB}  from './config/db';
import authRoutes from './routes/Auth';
import userRoutes from './routes/User';
import vehicleRoutes from './routes/Vehicle';
import maintenanceRoutes from './routes/Maintenance';


dotenv.config();

const app = express();

app.use(express.json());

app.use(cors(
  {
    origin: process.env.CLIENT_URL || "https://paeb-vehicle-management-front.vercel.app/auth/login",
    credentials: true,

  }
))

connectDB()

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/maintenances', maintenanceRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
