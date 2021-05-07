import asyncHandler from "express-async-handler"
import nodemailer from "nodemailer"

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const deliveryAutoReply = asyncHandler(async (req, res) => {
  let { orderItems, name, address, date, email } = req.body

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
        "1//04ONSvfVGOJOeCgYIARAAGAQSNwF-L9IrLqRHOMp3WqZA36BLeX7TvMYaY6WhUhylTfpZtMegZ04h8v0EyegxR5YeBq5h-RgmueE"
    }
  })

  let mailOptions = {
    from: "caltekmail2021@gmail.com",
    to: email,
    subject: `Your order has been shipped from Caltek Solutions!`,
    html: `
        <h3>Information</h3>
        <ul>
        <li>Recipient: ${name}</li>
        <li>Shipping Address: ${address}</li>
        <li>Shipped On: ${date}</li>
        </ul>

        <h3>Message</h3>
        <p>Thank you for shopping with Caltek Solutions!</p>
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

export { deliveryAutoReply }
