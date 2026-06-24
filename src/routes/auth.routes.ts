import { Router, type Request, type Response } from "express";
import {
  signUp,
  signIn,
  signOut,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controllers.js";
import isLoggedIn from "../middlewares/auth.middlewares.js";

const router: Router = Router();

router.route("/sign-up").post(signUp);
router.route("/sing-up").post(signIn);
router.route("/sign-out").post(isLoggedIn, signOut);
router.route("/change-password").post(isLoggedIn, changePassword);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);

export default router;
