import express from "express"
import prisma from "../db/prisma.js"
import authMiddleware from "../middlewares/authmiddleware.js"
import bcrypt, { hash } from "bcrypt"
const router = express.Router()

router.get("/chats", authMiddleware, async (req, res) => {
    const tokenUserId = req.user.id

    try {
        const chats = await prisma.chat.findMany({
            where: {
                userIDs: {
                    hasSome: [tokenUserId]
                }
            }
        })

        for(const chat of chats) {
            const receiverId = chat.userIDs.find((id)=> id !== tokenUserId)
            const receiver = await prisma.user.findUnique({
                where:{
                    id: receiverId
                },
                select:{
                    id:true,
                    username:true,
                    avatar:true
                }
            })
            chat.receiver = receiver
        }
        res.status(200).json(chats);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Failed to get chats" })
    }
})

router.get("/:id", authMiddleware, async (req, res) => {
    
    const tokenUserId = req.user.id
    
    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenUserId]
                }
            },
            include: {
                Message: {
                    orderBy: {
                        createdAt: "asc",
                    }
                }
            }
        })
        await prisma.chat.update({
            where: {
                id: req.params.id
            },
            data: {
                seenBy: {
                    push: [tokenUserId]
                }
            }
        })
        res.status(200).json(chat);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Failed to get chats1" })
    }
})

router.post("/addChat", authMiddleware, async (req, res) => {
    const tokenUserId = req.user.id

    try {
        const newchat = await prisma.chat.create({
            data: {
                userIDs: [tokenUserId, req.body.receiverId]
            }
        })
        res.status(200).json(newchat);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Failed to get chats" })
    }
})

router.put("/readChat/:id", authMiddleware, async (req, res) => {
    const tokenUserId = req.user.id

    try {
        const chat = await prisma.chat.update({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenUserId]
                }
            },
            data: {
                seenBy: {
                    set: [tokenUserId]
                }
            }
        })
        res.status(200).json(chat);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Failed to get chats" })
    }
})

export default router;
