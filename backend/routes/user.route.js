import express from "express"
import prisma from "../db/prisma.js"
import authMiddleware from "../middlewares/authmiddleware.js"
import bcrypt, { hash } from "bcrypt"
const router = express.Router()

router.get("/allusers", async (req, res) => {
    const data = await prisma.user.findMany({})
    return res.json(data)
})
router.put("/update/:id", authMiddleware, async (req, res) => {
    const id = req.params.id;
    const Usertoken = req.user.id
    const { password, avatar, ...inputs } = req.body
   
    if (id !== Usertoken) {
        return res.status(401).json({ message: "not authorized" })
    }
    let hashedpass = null
    try {
        if (password) {
            hashedpass = await bcrypt.hash(password, 10)
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...inputs,
                ...(hashedpass && { password: hashedpass }),
                ...(avatar && { avatar })
            }
        })
        console.log(updatedUser)
        return res.json(updatedUser)
    } catch (e) {
        return res.status(401).json({ message: "something went wrong" })
    }
})

router.delete("/deleteuser/:id", authMiddleware, async (req, res) => {
    const id = req.params.id;
    const Usertoken = req.user.id 
    if (id !== Usertoken) {
        return res.status(401).json({ message: "not authorized" })
    }
    try{
        await prisma.user.delete({
            where: {id}
        })
        return res.status(200).json({message:"user deleted successfully"})
    } catch(e){
        return res.status(401).json({message:"something went wrong"})
    }
})

export default router;
// 66c4f2d80f5cdd05ffcbcc97