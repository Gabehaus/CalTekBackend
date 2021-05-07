import express from "express"
const router = express.Router()
import { protect, admin } from "../middleware/authMiddleware.js"
import { deliveryAutoReply } from "../controllers/autoReplyController.js"

router.route("/").post(deliveryAutoReply)

export default router
