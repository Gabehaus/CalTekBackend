import express from "express"
const router = express.Router()
import nodemailer from "nodemailer"

router.post("/", (req, res) => {
  let data = req.body

  let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      type: "OAuth2",
      user: "caltekmail2021@gmail.com",
      pass: "45654513aB$%^",
      clientId:
        "708032881609-p0hqrgdittll65cjr1fectrflah01iiu.apps.googleusercontent.com",
      clientSecret: "GI9EAXRfKV7KdlK_Lfu4v6kl",
      refreshToken:
        "1//049rOExjBSvtCCgYIARAAGAQSNwF-L9IrxSnDGgUShlcWQ1EDeq0yi_PZ3OQSjnSQ1Zm3Ury8zwbGCnmHdZWzKLV3nnhml7pvTYg"
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
      console.log("error: ", error)
    } else {
      res.send("Success")
      console.log("success")
    }

    smtpTransport.close()
  })
})

// @route DELETC api/items/:id
//@desc DELETE An Item
// @access Private

export default router
