
import dayjs from "dayjs";

import { pollCollection } from "../Config/dataBase.js";


export default async (req,res)=>{
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
        expireAt = futureDate.format("YYYY-MM-DD HH:mm")
    }
    const postPoll = {
        title:title,
        expireAt:expireAt
    }
    try {
        await pollCollection.insertOne(postPoll)
        return res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(422)
    }

} 