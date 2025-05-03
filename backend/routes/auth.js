import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { authenticate } from "../middleware/auth.js";
import { SECRET_KEY } from "../config/config.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) return res.status(400).json({ error: "All fields are required" });

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ error: "Username already exists" });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error during registration" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Username and password are required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // place authentication mechanism here (log in the user)
    const token = jwt.sign({ userId: user._id, userRole: user.role }, SECRET_KEY);
    res.cookie("jwt", token, { httpOnly: true });

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Internal server error during login" });
  }
});

router.post("/logout", (req, res) => {
  // place authentication mechanism here (log out the user)
  res.clearCookie("jwt");

  return res.status(200).json({ message: "Logout successful" });
});

router.get("/status", authenticate, async (req, res) => {
  res.status(200).send("Successs");
});

export default router;
