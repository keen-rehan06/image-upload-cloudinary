  import userModel from "../models/user.model.js";

  export const checkUserRegisterFields = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password)
        return res
          .status(401)
          .send({ message: "All fields are required!", success: false });
      const user = await userModel.findOne({ $or: [{ email }, { username }] });
      if (user)
        return res
          .status(401)
          .send({ message: "User Already Registered", success: false });
      const data = { username, email, password };
      for (const [key, value] of Object.entries(data)) {
        if (typeof value !== "string") {
          res.status(401).send({ message: `${key} must be string` });
        }
      }
      next();
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: "Server Error", error });
    }
  };

  export const checkUserLoginFields = async(req,res,next) => {
    try {
      const {email,password} = req.body;
      if(!email || !password) return res.status(401).send({
        message:"All fields are required!",
        success:false
      });
      const user = await userModel.findOne({email});
      if(!user) return res.status(404).send({message:"User not found!",success:false})
      const data = {email,password};
    for(const [key,value] of Object.entries(data)){
      if(typeof value !== "string"){
        return res.status(401).send({message:`${key} must be string!`})
      }
    }
    next();
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: "Server Error", error });
    }
  }