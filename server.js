import path from "path";
import { fileURLToPath } from "url";
import "express-async-errors";
import colors from "colors";
import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./db/connect.js";

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/users");

//Server
const PORT = process.env.PORT || 5000;
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(
            PORT,
            console.log(`Server listening on Port ${PORT}...`.bgCyan.bold)
        );
    } catch (error) {
        console.log(error);
    }
};