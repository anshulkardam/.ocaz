import express from "express"

const router = express.Router()

router.get("/sex", (req,res) => {
    res.send(" user route works!")
})

export default router;