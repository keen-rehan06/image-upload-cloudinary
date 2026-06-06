import express from "express";
import { uploadFile } from "../controllers/upload.controller.js";
import { upload } from "../config/multer.config.js";

const app = express.Router();

app.post("/upload",upload.single('image'),uploadFile);

export default app;