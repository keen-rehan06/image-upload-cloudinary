import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
    name:String,
    url:String
})

const uploadModel = new mongoose.model("upload",uploadSchema);

export default uploadModel;