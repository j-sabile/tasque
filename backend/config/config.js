import dotenv from "dotenv";

dotenv.config();

const get = (name) => {
  const value = process.env[name];
  if (!value) {
    console.error(`❌ Missing required environment variable: ${name}`);
    process.exit(1);
  }
  return value;
};

export const MONGODB_URI = get("MONGODB_URI");
export const SECRET_KEY = get("SECRET_KEY");
