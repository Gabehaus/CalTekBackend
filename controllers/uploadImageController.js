import aws from "aws-sdk"
import express from "express"
import multer from "multer"
import multerS3 from "multer-s3"
import asyncHandler from "express-async-handler"
import { v4 as uuidv4 } from "uuid"

aws.config.update({
  bucketName: "caltekshopbucket1",
  secretAccessKey: "Gu0A5F1vYi/2+DMM1nK9JFyCr7v2D35XmM5x96ae",
  accessKeyId: "AKIAWLZFTWX3VMSNWAUC",
  region: "us-west-2"
})

const s3 = new aws.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "caltekshopbucket1",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function(req, file, cb) {
      cb(null, req.s3Key)
    }
  })
})

const singleFileUpload = upload.single("image")

function uploadToS3(req, res) {
  req.s3Key = uuidv4()
  let downloadUrl = `https://caltekshopbucket1.s3-us-west-2.amazonaws.com/${req.s3Key}`
  return new Promise((resolve, reject) => {
    return singleFileUpload(req, res, err => {
      if (err) return reject(err)
      return resolve(downloadUrl)
    })
  })
}

export const uploadImage = asyncHandler(async (req, res) => {
  uploadToS3(req, res)
    .then(downloadUrl => {
      return res.status(200).send(downloadUrl)
    })
    .catch(e => {
      console.log(e)
    })
})

//process.env.S3_ACCESS_KEY_ID
//process.env.S3_SECRET_ACCESS_KEY
