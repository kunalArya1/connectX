import { Router } from "express";


const router: Router = Router();


router.route("user/requests/recived").post()
router.route("user/connections").post()
router.route("user/feed").post()



export default router;