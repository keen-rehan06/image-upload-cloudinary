import { configDotenv } from "dotenv";
configDotenv({path:"./.env"})

import express from "express";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import cors from "cors";

const app = express();

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(cors({origin:'http://localhost:5173',credentials:true}));


app.get("/",(req,res)=>{
    res.send("Hello World!!");
})

app.listen(3000,()=>{
    console.log("App is running on port 3000")
})


