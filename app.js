import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import router from "./route/route.js"
import authroute from "./route/authroutes.js"
import cors from "cors"
import swaggerexpress from "swagger-ui-express"
import swaggerdocs from "./swagger.js"

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


app.use(cors({
  origin: ["https://elon-frontend.vercel.app", "http://localhost:5173"] 
}));
mongoose.connect(process.env.MONGO_URL, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10
}).then(()=>  {
  console.log("MongoDB connected successfully")
}).catch((error)=>  {
  console.error("MongoDB connection failed:", error.message)
  process.exit(1)
})

app.use("/uploads", express.static("uploads"));
app.use("/api/auth",authroute)
app.use("/api",router)
app.use("/api/doc", swaggerexpress.serve, swaggerexpress.setup(swaggerdocs));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
