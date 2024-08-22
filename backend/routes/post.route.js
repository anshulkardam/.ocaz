import express from "express"
import authMiddleware from "../middlewares/authmiddleware.js"
import prisma from "../db/prisma.js"

const router = express.Router()

router.get("/eventslist", async (req, res) => {
    try {
        const posts = await prisma.post.findMany({})
        return res.json(posts)
    } catch (e) {
        return res.json({ message: "error found" })
    }
})
router.post("/createEvent", authMiddleware, async (req, res) => {
    const body = req.body
    const usertoken = req.user.id
    console.log(usertoken)

    const post = await prisma.post.create({
        data: {
            ...body.postData,
            userId: usertoken,
            PostDetails: {
                create: body.PostDetails
            }
        }
    })
    return res.json(post)

})
router.get("/event/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)
    const event = await prisma.post.findUnique({
        where: { id },
        include: {
            PostDetails: true,
            user:{
                    select:{
                        username:  true,
                        avatar: true,
                    }
            },
        }
    })
    return res.json(event)
})

router.delete("/deleteEvent/:id", authMiddleware, async (req, res) => {
    const id = req.params.id
    const usertoken = req.user.id
    console.log("id",id)
    console.log("usertoken",usertoken)
    const usercheck = await prisma.post.findUnique({
        where:{id}
    })
    console.log("usertoken userid",usercheck.userId)
    if (usertoken !== usercheck.userId){

    }
    const delevent = await prisma.post.delete({
        where: {id}
    })
    return res.json(delevent)
})

router.put("/updateEvent/:id", authMiddleware, async (req, res) => {
    res.send(" post route works!")
})
export default router;