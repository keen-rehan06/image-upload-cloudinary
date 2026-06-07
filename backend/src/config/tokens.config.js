import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    console.log(process.env.JWT_SECRET)
    return jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
}