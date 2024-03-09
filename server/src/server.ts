import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"
import { config } from './config'
import { registerRoutes } from "./routes";

dotenv.config()
const PORT = config.server.port

const app: Express = express()

//-------Middleware
app.use(express.json())
app.use(cors());

(async function startUp() {
    try {
        //-------CONNECTING TO DB
        await mongoose.connect(config.mongo.url)
        console.log("Database connected successfully....")

        //-------ROUTES
        registerRoutes(app);

        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`)
        })

    } catch (err) {
        console.log("Database not connected")
    }
})();

 


