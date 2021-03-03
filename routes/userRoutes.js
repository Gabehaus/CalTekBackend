import express from "express"
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser
} from "../controllers/userController.js"

router
  .route("/")
  .post(registerUser)
  .get(protect, admin, getUsers) //this is a way of adding two routes to one line of code
router.post("/login", authUser) //didn't user router.route like in the other controller because we only have one route

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
