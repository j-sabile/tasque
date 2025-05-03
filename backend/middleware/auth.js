import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";

const authenticate = (req, res, next) => {
  // check if user or admin is logged in
  const token = req.cookies.jwt;
  if (!token) return res.sendStatus(403);
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = {
      userId: decoded.userId,
      userRole: decoded.userRole,
    };
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(403);
  }
  next();
};

export { authenticate };
