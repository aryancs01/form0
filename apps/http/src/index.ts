import express from "express"
import cors from "cors"
import { prisma } from "@repo/db"

const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json({
        message:"Worked"
    })
})

app.listen(3001,()=>{
    console.log("listening on 3001")
})