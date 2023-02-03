
import dayjs from "dayjs";

import { pollCollection } from "../Config/dataBase.js";


export default async (req,res)=>{
    console.log("entrou")
    const {title,expireAt} = req.body
    console.log(req.body)
    const noExpireAt = dayjs();
    
    if (expireAt == null) {
        expireAt = noExpireAt.add(30, "day").format("YYYY-MM-DD HH:mm");
        console.log(expireAt)
      } else {
        expireAt = dayjs(expireAt).format("YYYY-MM-DD HH:mm");
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