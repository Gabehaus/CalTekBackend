import path from "path"
import express from "express"
import multer from "multer"
const router = express.Router()

const storage = multer.diskStorage({
  //we send the file to the static "uploads" folder in our root directory
  destination(req, file, cb) {
    cb(null, "uploads/")
  },
  //the file is named using the filename the user inputs plus the date and then the extension name - we get this using the node module called "path"
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  }
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb("Images only!")
  }
}

const upload = multer({
  storage,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb)
  }
})

//.single specifies that only a single image will be uploaded
router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
