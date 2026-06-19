import dotenv from "dotenv";
dotenv.config({});
import express, { type Application } from "express";
import { connectDB } from "./config/db.js";
import auhtRouter from "./routes/auth.routes.js";

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use("/auth", auhtRouter);

connectDB()
  .then(() => {
    console.log(`Database connected succesfully`);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Database connection failed ${error}`);
    console.log(`Server not statred beacause database connection failed`);
    process.exit(1);
  });
