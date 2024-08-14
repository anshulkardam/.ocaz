import express from "express"
import bcrypt from "bcrypt"
import prisma from "../db/prisma.js"
import jwt from "jsonwebtoken"
const router = express.Router()


router.post("/register", async (req,res) => {
    const {username,email, password} = req.body
    try {
    const hashedpass = await bcrypt.hash(password,10)
    const newUser = await prisma.user.create({
        data : {
            username,
            email,
            password : hashedpass
        }
    })
    res.status(200).json({message: "user created successfully"})
        } catch(e)
        {
            res.status(500).json({message: "something went wrong during register!"})
        }
})
router.post("/login", async (req,res) => {
    const {username , password} = req.body
    try {
    const Usercheck = await prisma.user.findUnique({
        where: {
            username
        }
    })
   
    if(!Usercheck){
    
        return res.status(411).json({message: "Invalid Credentials 1"})
    }
    const checkPass = await bcrypt.compare(password, Usercheck.password)
   
    if(!checkPass){
        return res.status(411).json({message: "Invalid Credentials 2"})
    }
    const cookieage = 1000 * 60 * 60 * 24 * 7
    const token = jwt.sign({
        id:Usercheck.id
    }, process.env.JWT_SECRET_KEY, {expiresIn: cookieage})

    
    res.cookie("token",token, {
        httpOnly: true,
        // secure: true
        maxAge: cookieage
    }).status(200).json ({message: "Login Successfully"})
    } catch(e){
        res.json({message: "Invalid Credentials 4"})
    }

})
router.post("/logout", (req,res) => {
    res.clearCookie("token").status(200).json({message:"logout successfully"})
})
export default router;