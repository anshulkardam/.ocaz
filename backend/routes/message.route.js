import express from "express"
import prisma from "../db/prisma.js"
import authMiddleware from "../middlewares/authmiddleware.js"
import bcrypt, { hash } from "bcrypt"
const router = express.Router()

router.post("/newmsg/:chatid", authMiddleware, async (req, res) => {
    const tokenUserId = req.user.id
    const chatId = req.params.chatid
    const text = req.body.text
    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId,
                userIDs: {
                    hasSome: [tokenUserId]
                }
            }
        })
        if (!chat) return res.status(404).json({ message: "chat not found" })
        const message = await prisma.message.create({
            data: {
                text,
                chatId,
                userId: tokenUserId
            }
        })
        await prisma.chat.update({
            where: {
                id: chatId
            },
            data: {
                seenBy: [tokenUserId],
                lastMessage: text
            }
        })
        res.status(200).json(message)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Failed to get the message" })
    }
})


export default router;
