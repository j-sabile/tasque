import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://cube:9RwedVt5ctouHi3e@mycluster.ytccdon.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster");
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
