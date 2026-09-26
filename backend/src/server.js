import express from "express";
import cors from "cors";
import dns from 'dns';
import dotenv from "dotenv";
import { existsSync } from "fs";
//const express = require("express"); when by default package is commonjs
import path from "path";

import {connectDB} from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js"
import ratelimit from "./config/upstash.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();
dns.setServers(['8.8.8.8', '1.1.1.1']);


const app= express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
const frontendDistPath = path.join(__dirname, "../frontend/dist");

//MIDDLEWARE

if(process.env.NODE_ENV!=="production"){
    app.use(cors(
    {origin: "http://localhost:5173",
        
    }
));
}

app.use(express.json());
app.use(rateLimiter);

//our simple custom middleware
// app.use((req, res, next)=>{
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);


if (existsSync(frontendDistPath)) {
    app.use(express.static(frontendDistPath));

    app.get("*", (req, res, next) => {
        if (req.path === "/api" || req.path.startsWith("/api/")) return next();
        res.sendFile(path.join(frontendDistPath, "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.status(200).json({
            message: "Thinkboard API is running",
            notes: "/api/notes",
        });
    });
}



connectDB().then(()=>{
    app.listen(PORT, ()=>{
    console.log("Server started PORT:",PORT);
    });
})
