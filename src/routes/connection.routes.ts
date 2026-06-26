import { Router } from "express";
import { reviewRequest, sendRequest } from "../controllers/connection.controllers.js";

const router: Router = Router();

router.route("/request/send/:status/:toUserId").post(sendRequest);
router.route("/request/review/:status/:requestId").post(reviewRequest);

export default router;
