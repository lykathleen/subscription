import express from 'express';
import authRoutes from './routes/auth';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

mongoose
  .connect(
    process.env.MONGO_URI as string
  )
  .then(() => {
    console.log("Connected to database");
    const app = express();
    
    app.use(express.json());
    app.use(cors());
    app.use('/auth', authRoutes);
    app.listen(8080, () => {
      console.log(`Now listening to port 8080`); 
    })
  })
  .catch((err) => {
    console.log(err);
    
    throw new Error(err)
  })

