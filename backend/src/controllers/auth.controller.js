import { generateToken } from "../config/tokens.config.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password,10);
    const user = await userModel.create({
        username,
        email,
        password:hashPassword
    })
    const token = generateToken(user);
    user.token = token; 
    await user.save();
    const newUser = await userModel.findById(user.id).select("-password -token");
    res.cookie("token",token);
    return res.status(200).send({message:"User registerd successfully",success:true,data:newUser});
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({message:"Internal Server Error",error})
  }
};
