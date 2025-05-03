import express from "express";
import Task from "../models/task.js";
import { authenticate } from "../middleware/auth.js";
import { USER_TYPES } from "../config/constants.js";

const router = express.Router();

router.use(authenticate); // middleware

router.get("/", async (req, res) => {
  try {
    const { userId, userRole } = req.user;
    const filter = userRole === USER_TYPES.USER ? { createdBy: userId } : {};
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error!" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    const { userId } = req.user;
    const task = new Task({ title, createdBy: userId });
    await task.save();
    res.status(201).json(task);
  } catch (e) {
    console.error(e.message);
    res.status(500).send();
  }
});

router.patch("/:id", async (req, res) => {
  const { completed, title } = req.body;
  const { userId, userRole } = req.user;
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });
    if (userRole !== USER_TYPES.ADMIN && task.createdBy.toString() !== userId) return res.status(403).json({ error: "Forbidden" });
    if (completed !== undefined) task.completed = completed;
    if (title !== undefined) task.title = title;
    await task.save();
    res.status(200).json({ message: "Task updated" });
  } catch (err) {
    console.error(err.message)

    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { userId, userRole } = req.user;
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });
    if (userRole !== USER_TYPES.ADMIN && task.createdBy.toString() !== userId) return res.status(403).json({ error: "Forbidden" });
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
