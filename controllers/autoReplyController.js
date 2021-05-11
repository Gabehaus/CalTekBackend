import asyncHandler from "express-async-handler"
import nodemailer from "nodemailer"

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const deliveryAutoReply = asyncHandler(async (req, res) => {
  let {
    orderItems,
    name,
    address,
    email,
    shippedOn,
    shipService,
    arrivesIn,
    trackingNumber
  } = req.body

  //   let orderHTML = orderItems.map(
  //     or => `<li>Product: ${or.name}</li> ``<li>Quantity: ${or.qty}</li> `
  //   )

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
        <h3>Products Shipped</h3>
        ${orderItems
          .map(or => or.name + `, Quantity: ` + or.qty + `<br>`)
          .join("")}

        <h3>Shipping Information</h3>
        <ul>
        <li>Recipient: ${address.recipient}</li>
        <li>Shipping Address: ${address.address}, ${address.city}, ${
      address.state
    } ${address.postalCode}, ${address.country}</li>
        <li>Shipped On: ${shippedOn}</li>
        <li>Shipping Service: ${shipService}</li>
        <li>Tracking Number: ${trackingNumber}</li>
        <li>Arrives In: ${arrivesIn}</li>
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
