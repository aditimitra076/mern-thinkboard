import express from "express";
import cors from "cors";
import dns from 'dns';
import dotenv from "dotenv";
//const express = require("express"); when by default package is commonjs


import {connectDB} from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js"
import ratelimit from "./config/upstash.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();
dns.setServers(['8.8.8.8', '1.1.1.1']);


const app= express();
const PORT = process.env.PORT || 5001;


//MIDDLEWARE
app.use(cors(
    {origin: "http://localhost:5173",
        
    }
));
app.use(express.json());
app.use(rateLimiter);


//our simple custom middleware
// app.use((req, res, next)=>{
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);


connectDB().then(()=>{
    app.listen(PORT, ()=>{
    console.log("Server started PORT:",PORT);
    });
})
