import { pollCollection } from "../Config/dataBase.js";

export default  async (req,res)=>{
    try {
        console.log("teste")
        const polls = await pollCollection.find().toArray()
        return res.send(polls)
    } catch (error) {
        res.send(error)
        
    }

}
