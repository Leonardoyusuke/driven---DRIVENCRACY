import choicePost from "../Controllers/choicePost.js";
import choicePostVote from "../Controllers/choicePostVote.js";
import { Router } from "express";



const choiceRoutes = Router();

choiceRoutes.post("/choice",choicePost);
choiceRoutes.get("/choice/:id/vote",choicePostVote)

export  {choiceRoutes}