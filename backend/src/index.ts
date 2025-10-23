import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dbConnect from "./config/db";
import authRoutes from './routes/auth.routes';
import listinRoutes from './routes/listing.routes';
import roommateRoutes from './routes/roommate.routes'

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));


app.use("/api/auth", authRoutes);
app.use("/api/listing", listinRoutes);
app.use("/api/roommate", roommateRoutes);

app.listen(PORT, async() => {
  await dbConnect();
  console.log(`Server is running at port ${PORT}`);
});
