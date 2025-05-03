import express from "express";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
