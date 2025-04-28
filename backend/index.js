import express from "express";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import connectDB from "./config/db.js";

const app = express();
connectDB();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
