
import { choiceCollection } from "../Config/dataBase.js"

export default async (req,res)=>{
    const voteId = req.params.id
    console.log(voteId)
try {
    console.log("entrou")
    const validacao = await choiceCollection.findOne({_id:voteId})
    console.log(validacao,"validacao")
    if(!validacao){
       return res.sendStatus(404)
    }
    const choices = await choiceCollection.find({pollId}).toArray()
    return res.send(choices)
} catch (error) {
    return res.send(error)
    
}
}