import path from "path"
import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import morgan from "morgan"
import mongoose from "mongoose"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import * as cors from "cors"
//import connectDB from "./config/db.js"

import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import mailRoute from "./routes/mailRoute.js"
import projectRoutes from "./routes/projectRoutes.js"

dotenv.config()

app.use(cors())

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://45654513:45654513@caltekshop1.yybaf.mongodb.net/CalTekShop?retryWrites=true&w=majority`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
      }
    )

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

connectDB()

const app = express()

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(express.json())

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/mail", mailRoute)
app.use("/api/projects", projectRoutes)

app.get("/api/config/paypal", (req, res) =>
  res.send(
    "AWh55FsCO7GuLc7htwym7o1MMzM4W8quZyEtAKZihunOyLB94PSuFAV_auGa797l1doCc27bYQMHGRnB"
  )
)

//Dummy test
app.get("/", (req, res) => {
  res.json({ message: "Backend server.js is working!" })
})

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
