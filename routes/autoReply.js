import express from "express"
const router = express.Router()
import { protect, admin } from "../middleware/authMiddleware.js"
import { deliveryAutoReply } from "../controllers/autoReplyController.js"

router.route("/").post(protect, admin, deliveryAutoReply)

export default router
