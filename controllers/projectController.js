import asyncHandler from "express-async-handler"
import Project from "../models/projectModel.js"

// @desc    Fetch all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const pageSize = 6
  const page = Number(req.query.pageNumber) || 1

  const count = await Project.countDocuments({})
  const projects = await Project.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ projects, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = asyncHandler(async (req, res) => {
  const project = new Project({
    user: "Sample user name",
    hd: "Sample heading",
    desc: "Sample description",
    client: "Sample client",
    imag: "/images/sample.jpg",
    longDesc: "Sample long description",
    note1: "Sample note",
    note2: "Sample note",
    note3: "Sample note"
  })

  const createdProject = await project.save()
  res.status(201).json(createdProject)
})

// @desc    Fetch single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (project) {
    res.json(project)
  } else {
    res.status(404)
    throw new Error("Project not found")
  }
})

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (project) {
    await project.remove()
    res.json({ message: "Project removed" })
  } else {
    res.status(404)
    throw new Error("Project not found")
  }
})

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = asyncHandler(async (req, res) => {
  const { hd, desc, client, imag, longDesc, note1, note2, note3 } = req.body

  const project = await Project.findById(req.params.id)

  if (project) {
    project.hd = hd
    project.desc = desc
    project.client = client
    project.imag = imag
    project.longDesc = longDesc
    project.note1 = note1
    project.note2 = note2
    project.note3 = note3

    const updatedProject = await project.save()
    res.json(updatedProject)
  } else {
    res.status(404)
    throw new Error("Project not found")
  }
})

export {
  createProject,
  getProjects,
  getProjectById,
  deleteProject,
  updateProject
}
