import express from "express"
const router = express.Router()
import {
  getProjects,
  createProject,
  getProjectById,
  deleteProject,
  updateProject
} from "../controllers/projectController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

router
  .route("/")
  .get(getProjects)
  .post(protect, admin, createProject) //add protect,admin later, and add get route
router
  .route("/:id")
  .get(getProjectById)
  .delete(protect, admin, deleteProject)
  .put(protect, admin, updateProject)

export default router
