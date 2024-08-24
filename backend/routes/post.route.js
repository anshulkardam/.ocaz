import express from "express"
import authMiddleware from "../middlewares/authmiddleware.js"
import prisma from "../db/prisma.js"

const router = express.Router()

router.get("/eventslist", async (req, res) => {
    const query = req.query
    console.log(query)
    try {
        const posts = await prisma.post.findMany({
            where: {
                city: query.city || undefined,
                title: query.title || undefined,
                price: {
                    gte: parseInt(query.minprice) || 0,
                    lte: parseInt(query.maxprice) || 100000000,
                }

            }
        })
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
            user: {
                select: {
                    username: true,
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
    console.log("id", id)
    console.log("usertoken", usertoken)
    const usercheck = await prisma.post.findUnique({
        where: { id }
    })
    console.log("usertoken userid", usercheck.userId)
    if (usertoken !== usercheck.userId) {

    }
    const delevent = await prisma.post.delete({
        where: { id }
    })
    return res.json(delevent)
})

router.put("/updateEvent/:id", authMiddleware, async (req, res) => {
    res.send(" post route works!")
})

router.post("/bookmarks", authMiddleware, async (req, res) => {
    const postId = req.body.postId;
    const usertoken = req.user.id
    const bookmarks = await prisma.bookmarks.findUnique({
        where: {
            userId_postId: {
                userId: usertoken,
                postId
            }
        }
    })
    if (bookmarks) {
        await prisma.bookmarks.delete({
            where: {
                id: bookmarks.id
            }
        })
        return res.json({ message: "Bookmark removed" })
    }
    else {
        await prisma.bookmarks.create({
            data:{
                userId: usertoken,
                postId
            }
        })
        return res.json({ message: "Bookmark saved" })
    }
})
export default router;