import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDB}  from './config/db.ts';
import authRoutes from './routes/Auth.ts';


dotenv.config();


const app = express();

app.use(express.json());

app.use(cors())

connectDB()

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
