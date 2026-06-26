import { Router } from "express";
import {
  allSentRequest,
  getAllConnection,
  getAllRequest,
  getFeed,
} from "../controllers/user.controllers.js";

const router: Router = Router();

router.route("/requests/recived").post(getAllRequest);
router.route("requests/sent").post(allSentRequest);
router.route("/connections").post(getAllConnection);
router.route("/feed").post(getFeed);

export default router;
