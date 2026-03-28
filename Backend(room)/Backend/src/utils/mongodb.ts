import mongoose from "mongoose";

export const connectDB = async (MONGO_URI: string) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected...');
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};