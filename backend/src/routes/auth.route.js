import express from "express";
import { checkUserRegisterFields } from "../middlewares/auth.middleware.js";
import { registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register",checkUserRegisterFields,registerUser)

export default router;