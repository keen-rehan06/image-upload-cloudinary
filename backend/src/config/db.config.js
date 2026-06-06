import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/cloud`) 
        console.log("MongoDb connected ✅")
    } catch (error) {
        console.log(`MongoDb connection Failed:❌`,error)
    }
}

export default connectDb;