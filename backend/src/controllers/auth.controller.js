import { generateToken } from "../config/tokens.config.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });
    const token = generateToken(user);
    user.token = token;
    await user.save();
    const newUser = await userModel
      .findById(user.id)
      .select("-password -token");
    res.cookie("token", token);
    return res
      .status(200)
      .send({
        message: "User registerd successfully",
        success: true,
        data: newUser,
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: "Internal Server Error", error });
  }
};

export const verfiyUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
      return res.status(401).send({message:"Authorization token is missing or invalid",success:false});
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token,process.env.JWT_SECRET);
      console.log('Decoded',decoded);
    } catch (error) {
      console.log('JWT ERROR NAME',error.name);
      console.log('JWT ERROR MESSAGE',error.message);
      return res.status(401).send({error:error.message,success:false})
    }
    const user = await userModel.findById(decoded.id);
    if(!user) return res.status(404).send({message:"User Not Found!",success:false});
    user.token = null;
    user.isVerified = true;
    await user.save();
    return res.status(200).send({message:"User Verified SuccessFully!",success:true,data:user}) ;
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

export const loginUser = async(req,res) => {
  try {
    const {email,password} = req.body;
    
  } catch (error) {
    
  }
}