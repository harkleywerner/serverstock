import express from "express"
import configServer from "./src/config/server.js"

const app = express()
const port = 3000

app.use(express.json())
configServer()


app.get("/",(req,res)=>{
    res.send("p")
})

app.listen(port,()=>{
    console.log(`Sever on en el puerto ${port}`)
})