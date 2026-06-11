import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
        default:"./src/public/rename.png"
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isLoggedIn:{
        type:Boolean,
        default:false
    },
    token:{
        type:String,
        default:null
    },
    refreshToken:{
        type:String,
        default:null
    },
    otp:{
     type:String,
     default:null
    },
    otpExpiry:{
        type:Date,
        default:null
    }
},{timestamps:true});

const userModel = new mongoose.model("user",userSchema);

export default userModel;