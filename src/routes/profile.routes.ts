import { Router } from "express";
import { profileView, profileEdit } from "../controllers/profile.controllers.js";
import isLoggedIn from "../middlewares/auth.middlewares.js";
isLoggedIn;

const router: Router = Router();

router.route("/view").post(isLoggedIn, profileView);
router.route("/edit").patch(isLoggedIn, profileView);

export default router;
