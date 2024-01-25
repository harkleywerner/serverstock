import express from "express"
import configServer from "./src/config/server.js"
import cors from "cors"
import usuarios from "./src/router/usuarios.router.js"

configServer()
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use("/usuarios",usuarios)




app.listen(port,()=>{
    console.log(`Sever on en el puerto ${port}`)
})