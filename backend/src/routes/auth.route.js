import express from "express";
import {
  checkUserLoginFields,
  checkUserRegisterFields,
  isLoggedIn,
  isResetPassword,
} from "../middlewares/auth.middleware.js";
import {
  confirmOtp,
  generateOtpForForgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  verfiyUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", checkUserRegisterFields, registerUser);
router.get("/verify", verfiyUser);
router.post("/login", checkUserLoginFields, loginUser);
router.get("/logout",isLoggedIn,logoutUser);
router.post("/get-otp",generateOtpForForgotPassword);
router.post("/confirm-otp",isResetPassword,confirmOtp);
router.post("/reset-password",isResetPassword,resetPassword)

export default router;
