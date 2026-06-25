import { Router } from "express";

const router: Router = Router();


router.route("/request/send/:status/:toUserId").post();
router.route("/request/review/:status/:requestId").post()


export default router;