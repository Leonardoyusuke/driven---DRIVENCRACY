
import dayjs from "dayjs";

import { pollCollection } from "../Config/dataBase.js";


export default async (req,res)=>{
    console.log("entrou")
    let {title} = req.body
    console.log(req.body)
    let expireAt = dayjs().add(30,'day').format("YYYY-MM-DD HH:mm")
    

    const postPoll = {
        title:title,
        expireAt: expireAt
    }
    try {
        await pollCollection.insertOne(postPoll)
        return res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(422)
    }

} 