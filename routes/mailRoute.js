import express from "express"
const router = express.Router()
import nodemailer from "nodemailer"

router.post("/", (req, res) => {
  let data = req.body

  let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: "caltekmail2021@gmail.com",
      pass: "45654513aB$%^"
    }
  })

  let mailOptions = {
    from: data.email,
    to: "Gabehaus@gmail.com",
    subject: `Message from ${data.name}`,
    html: `
        <h3>Information</h3>
        <ul>
        <li>Name: ${data.name}</li>
        <li>Email: ${data.email}</li>
        </ul>

        <h3>Message</h3>
        <p>${data.message}</p>
        `
  }

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error)
    } else {
      res.send("Success")
    }

    smtpTransport.close()
  })
})

// @route DELETC api/items/:id
//@desc DELETE An Item
// @access Private

export default router
