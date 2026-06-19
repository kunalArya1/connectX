import { Router, type Request, type Response } from "express";

const router: Router = Router();
import User from "../models/user.model.js";

router.post("/sign-up", async (req: Request, res: Response) => {
  //   const { id, username, email, password } = req.body;

  const myUser = {
    id: 1,
    username: "Kunal arya",
    email: "kunal@google.com",
    password: "google@123",
  };

  const user = new User(myUser);
  await user.save();

  res.status(201).json({
    message: "user created succesfully",
    user: user,
  });
});

export default router;
