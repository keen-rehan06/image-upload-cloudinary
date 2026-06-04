import { configDotenv } from "dotenv";
configDotenv({path:"./.env"})
import express from "express";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import cors from "cors";
import uploadRoute from "./routes/upload.route.js"

const app = express();

app.use(express.json({}));
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:'http://localhost:5173',credentials:true}));

app.use("/",uploadRoute)

app.get("/",(req,res)=>{
    res.send("Hello World!!");
})

app.listen(3000,()=>{
    console.log("App is running on port 3000")
})


