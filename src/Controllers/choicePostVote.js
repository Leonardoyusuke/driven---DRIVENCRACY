import dayjs from "dayjs"
import { choiceCollection } from "../Config/dataBase.js"

export default async(req,res)=>{
    const pollId = req.params
    try {
        await choiceCollection.insertOne({createdAt: dayjs().format("YYYY-MM-DD HH:mm"),
        choiceId: pollId})
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(500)
        
    }


}