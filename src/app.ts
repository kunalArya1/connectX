import dotenv from "dotenv";
dotenv.config({});
import express, { type Application } from "express";
import cors from "cors";
import auhtRouter from "./routes/auth.routes.js";

const app: Application = express();

app.use(express.json());
app.use(cors());

/**
 * Health Api
 * - return the health of the server
 */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
  });
});
app.use("/auth", auhtRouter);

export default app;
