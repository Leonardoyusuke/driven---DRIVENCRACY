import { choiceCollection } from "../Config/dataBase.js";
import { pollCollection } from "../Config/dataBase.js";

export default async (req,res) => {
    const {title,pollId} = req.body
    const escolha = {
        title:title,
        pollId:pollId}    
    try {
        const validacaoId = await pollCollection.find({_id:pollId})
        const validacaoTitle = await choiceCollection.find({pollId , title})
       console.log(validacaoTitle,"titulo")
        //if(!validacaoId){
          //      res.sendStatus(404)
        //    return  }
       if(validacaoTitle){
       res.sendStatus(409)
        return
    }
        const teste =  await choiceCollection.insertOne(escolha)
        res.sendStatus(201)
        console.log(teste,"teste")

    } catch (error) {
        res.send(error)
        
    }
} 