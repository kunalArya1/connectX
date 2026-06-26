import dotenv from "dotenv";
dotenv.config({});
import express, { type Application } from "express";
import cors from "cors";
import path from "node:path";
import auhtRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import isLoggedIn from "./middlewares/auth.middlewares.js";
import profileRouter from "./routes/profile.routes.js";
import connectionRouter from "./routes/connection.routes.js";
import { apiReference } from "@scalar/express-api-reference";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/openapi.json", (_req, res) => {
  res.sendFile(path.resolve("src/utils/openapi.json"));
});

app.use(
  "/reference",
  apiReference({
    theme: "purple",
    url: "/openapi.json",
  }),
);

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
app.use("/request", isLoggedIn, connectionRouter);
app.use("/profile", profileRouter);
app.use("/user", isLoggedIn, userRouter);

export default app;
