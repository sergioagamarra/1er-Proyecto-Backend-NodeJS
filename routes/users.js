const express = require("express")
const authMiddleware = require("../middleware/authValidation")
const adminValidation = require("../middleware/authValidation")
const UserService = require("../services/users")

function users(app){
    const router = express.Router()
    const userServ = new UserService()

    app.use("/api/users",router)
    
    router.get("/", ...authMiddleware("admin"), async (req,res)=>{
        /* const user = req.user
        if(user.role === "admin"){
            const users = await userServ.getAll()
            return res.json(users)
        }

        return res.status(403).json({
            error: true,
            message: "Insufficient permissions"
        }) */
        const users = await userServ.getAll()
        return res.json(users)
        
    })

    router.post("/", async (req,res)=>{
        const user = await userServ.create(req.body)
        return res.json(user)
    })

    router.put("/:id", async (req,res)=>{
        const user = await userServ.update(req.params.id, req.body)
        return res.json(user)
    })

    router.delete("/:id", async (req,res)=>{
        const user = await userServ.delete(req.params.id)
        return res.json(user)
    })
}

module.exports = users