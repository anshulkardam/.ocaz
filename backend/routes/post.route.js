import express from "express"
import authMiddleware from "../middlewares/authmiddleware.js"
import prisma from "../db/prisma.js"

const router = express.Router()

router.get("/eventslist", async (req, res) => {
    const query = req.query

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
        return res.status(200).json(posts)
    } catch (e) {
        return res.status(500).json({ message: "error found" })
    }
})
router.post("/createEvent", authMiddleware, async (req, res) => {
    const body = req.body
    const usertoken = req.user.id
    try {
        const post = await prisma.post.create({
            data: {
                ...body.postData,
                userId: usertoken,
                PostDetails: {
                    create: body.PostDetails
                }
            }
        })
        return res.status(201).json(post)
    } catch (e) {
        return res.status(409).json({ message: "error found" })
    }

})
router.get("/event/:id", async (req, res) => {
    const id = req.params.id
    try {
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
        return res.status(200).json(event)
    } catch (e) {
        return res.status(404).json({ message: "error found" })
    }
})

router.delete("/deleteEvent/:id", authMiddleware, async (req, res) => {
    const id = req.params.id
    const usertoken = req.user.id
    try {
        const usercheck = await prisma.post.findUnique({
            where: { id }
        })

        if (usertoken !== usercheck.userId) {

        }
        const delevent = await prisma.post.delete({
            where: { id }
        })
        return res.status(200).json(delevent)
    } catch (e) {
        return res.status(500).json({ message: "error found" })
    }
})

router.put("/updateEvent/:id", authMiddleware, async (req, res) => {
    res.send(" post route works!")
})

router.post("/bookmarks", authMiddleware, async (req, res) => {
    const postId = req.body.postId;
    const usertoken = req.user.id
    try {
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
                data: {
                    userId: usertoken,
                    postId
                }
            })
            return res.status(200).json({ message: "Bookmark saved" })
        }
    } catch (e) {
        return res.status(500).json({ message: "error found" })
    }
})
export default router;