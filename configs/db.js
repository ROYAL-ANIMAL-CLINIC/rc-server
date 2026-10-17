
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/animls`);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

export default connectDB;
