import express from "express"
import postRouter from "./post.route.js"
import authRouter from "./auth.route.js"
import userRouter from "./user.route.js"

const Mainrouter = express.Router()


Mainrouter.use('/auth' , authRouter)

Mainrouter.use('/post' , postRouter)

Mainrouter.use('/user' , userRouter)

export default Mainrouter;