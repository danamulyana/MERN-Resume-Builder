import express from "express";
import cors from 'cors';
import path from 'path';
import connectDB from '../src/config/db';
import env from 'dotenv';
import authRoutes from "./routes/authRoutes";

env.config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// connect DB
connectDB();

app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
// app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
