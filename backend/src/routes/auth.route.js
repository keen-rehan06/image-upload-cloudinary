import express from "express";
import { checkUserRegisterFields } from "../middlewares/auth.middleware.js";
import { registerUser, verfiyUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register",checkUserRegisterFields,registerUser)
router.get("/verify",verfiyUser);

export default router;