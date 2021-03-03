import mongoose from "mongoose"

const projectSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      ref: "User"
    },
    hd: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    client: {
      type: String,
      required: true
    },
    imag: {
      type: String,
      required: true
    },
    longDesc: {
      type: String,
      required: true
    },
    note1: {
      type: String,
      required: true
    },
    note2: {
      type: String,
      required: true
    },
    note3: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Project = mongoose.model("Project", projectSchema)

export default Project
