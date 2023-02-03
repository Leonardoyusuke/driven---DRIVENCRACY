import { MongoClient } from "mongodb";
import dotenv from "dotenv";


dotenv.config()

const mongoClient = new MongoClient(process.env.MONGO_URI)
let db;

try {
    await mongoClient.connect()
    db = mongoClient.db()
    console.log("conectando mongo")
  } catch (error) {
    console.log(error)
  }



  export const pollCollection = db.collection("poll")
  export const choiceCollection = db.collection("choice")