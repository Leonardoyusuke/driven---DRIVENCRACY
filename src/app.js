import express, { response }  from "express";
import cors from "cors";
import {pollRoutes} from "./Routers/pollRoutes.js"
import {choiceRoutes} from "./Routers/choiceRoutes.js"

const server = express()
server.use(express.json())
server.use(cors())
const PORT = process.env.PORT || 5001


server.use([pollRoutes,choiceRoutes])

server.listen(PORT, () => {
    console.log(`server on port ${process.env.PORT}`)
  })