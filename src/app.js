import express, { response }  from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";
import dayjs from "dayjs";
import Joi from "joi";


const server = express()
server.use(express.json())
server.use(cors())
const PORT = 5001

dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL)
let db;

const titleSchema = Joi.object({
    title: Joi.string().required()
  })

try {
    await mongoClient.connect()
    db = mongoClient.db()
    console.log("conectando mongo")
  } catch (error) {
    console.log(error)
  }

server.post ("/poll", async (req,res)=>{
    console.log("entrou")
    const {title,expireAt} = req.body
    console.log(req.body)
    //arrumar o validate
    //const validation = titleSchema.validate(title, {abortEarly:false})
    //console.log(validation.error)
    //if(validation.error){
    //    res.sendStatus(422)
      //  return }
    if(expireAt === null ){
        const currentDate = dayjs();
        const futureDate = currentDate.add(30, 'day');
        expireAt = futureDate.format("DD/MM/YYYY")
    }
    const postPoll = {
        title:title,
        expireAt:expireAt
    }
    try {
        await db.collection("poll").insertOne(postPoll)
        return res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(422)
    }

} )

server.get("/poll", async (req,res)=>{
    try {
        console.log("teste")
        const polls = await db.collection("poll").find().toArray()
        return res.send(polls)
    } catch (error) {
        res.send(error)
        
    }

})


server.listen(PORT, () => {
    console.log(`server on port ${PORT}`)
  })