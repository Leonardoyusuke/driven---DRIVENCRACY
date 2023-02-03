import { choiceCollection } from "../Config/dataBase.js";
import { pollCollection } from "../Config/dataBase.js";

export default async (req, res) => {
    const id = req.params.id;
  
    try {
      const choices = await choiceCollection.find({ pollId: id }).toArray();
      const votes = await choiceCollection.find({}).toArray();
  
      const voteCounts = choices.map(choice => votes.filter(vote => vote.choiceId === choice._id).length);
      const winningChoiceIndex = voteCounts.indexOf(Math.max(...voteCounts));
      const winningChoice = choices[winningChoiceIndex];
      const poll = await pollCollection.findOne({id:id})
      
      res.send({...poll,
        result:{title: winningChoice}})

    } catch (error) {
    res.send(error)
    }
  }