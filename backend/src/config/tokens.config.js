import jwt from "jsonwebtoken";

export const token = (user) => {
    return jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
}