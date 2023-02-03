
import dayjs from "dayjs";

import { pollCollection } from "../Config/dataBase.js";


export default async (req,res)=>{
    console.log("entrou")
    let {title,expireAt} = req.body
    console.log(req.body)
    let noExpireAt = dayjs().format("YYYY-MM-DD HH:mm")
    
    if (expireAt == null) {
        expireAt = noExpireAt.add(30, "day")
        console.log(expireAt)
      }

    const postPoll = {
        title:title,
        expireAt: noExpireAt
    }
    try {
        await pollCollection.insertOne(postPoll)
        return res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(422)
    }

} 