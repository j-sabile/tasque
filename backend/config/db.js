import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

const connectDB = async () => {
  try {
    // mongodb+srv = server
    // mongodb://localhost:27107
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
