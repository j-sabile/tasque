import express from "express";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import logger from "./middleware/logger.js";
import cors from "cors";

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use(cors({origin: "http://localhost:5173", credentials: true}))

app.get("/", (req, res) => res.send("API HOME"));
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
