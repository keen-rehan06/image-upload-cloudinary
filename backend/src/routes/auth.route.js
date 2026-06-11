import express from "express";
import {
  checkUserLoginFields,
  checkUserRegisterFields,
  isLoggedIn,
} from "../middlewares/auth.middleware.js";
import {
  loginUser,
  logoutUser,
  registerUser,
  verfiyUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", checkUserRegisterFields, registerUser);
router.get("/verify", verfiyUser);
router.post("/login", checkUserLoginFields, loginUser);
router.get("/logout",isLoggedIn,logoutUser);

export default router;
