import mongoose from "mongoose";

export const connectDB = async () => {
  const dbUrl = process.env.DB_URL;

  if (!dbUrl) {
    throw new Error("DB_URL is missing from environment variables");
  }

  await mongoose.connect(dbUrl);
};
