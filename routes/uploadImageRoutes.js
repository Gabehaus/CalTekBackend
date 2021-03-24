import express from "express"
import { uploadImage } from "../controllers/uploadImageController.js"
import { admin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").post(uploadImage)

export default router
