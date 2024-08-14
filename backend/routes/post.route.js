import express from "express"

const router = express.Router()

router.get("/say", (req,res) => {
    res.send(" post route works!")
})
router.post("/say", (req,res) => {
    res.send(" post route works!")
})
router.put("/say", (req,res) => {
    res.send(" post route works!")
})
router.delete("/say", (req,res) => {
    res.send(" post route works!")
})

export default router;