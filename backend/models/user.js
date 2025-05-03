import mongoose from "mongoose";
import { USER_TYPES } from "../config/constants.js";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(USER_TYPES), default: USER_TYPES.ADMIN },
});

export default mongoose.model("User", userSchema);
