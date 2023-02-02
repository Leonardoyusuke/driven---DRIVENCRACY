import express, { response }  from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";
import dayjs from "dayjs";
import Joi from "joi";
import { ObjectId } from "mongodb";


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
        expireAt = futureDate.format("DD/MM/YYYY HH:MM")
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

server.post("/choice", async(req,res)=>{
    const {title,pollId} = req.body
    const escolha = {
        title:title,
        pollId:pollId}    
    try {
        const validacaoId = await db.collection("poll").find({_id:pollId})
        const validacaoTitle = await db.collection("choice").find({pollId , title})
       console.log(validacaoTitle,"titulo")
        if(!validacaoId){
                res.sendStatus(404)
                return
            }
       if(validacaoTitle){
       res.sendStatus(409)
        return
    }
        const teste =  await db.collection("choice").insertOne(escolha)
        res.sendStatus(201)
        console.log(teste,"teste")

    } catch (error) {
        res.send(error)
        
    }
} )

server.get("/poll/:id/vote", async (req,res)=>{
    const pollId = req.params.id
    console.log(pollId)
try {
    console.log("entrou")
    const validacao = await db.collection("choice").findOne({pollId})
    console.log(validacao)
    if(!validacao){
       return res.sendStatus(404)
    }
    const choices = await db.collection("choice").find({pollId}).toArray()
    return res.send(choices)
} catch (error) {
    return res.send(error)
    
}
})

server.post("/choice/:id/vote", async(req,res)=>{
    const pollId = req.params
    try {
        await db.collection("choice").insertOne({      createdAt: dayjs().format("YYYY-MM-DD HH:mm"),
        choiceId: pollId})
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(500)
        
    }


})

server.listen(PORT, () => {
    console.log(`server on port ${PORT}`)
  })