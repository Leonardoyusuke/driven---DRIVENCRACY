import { Router } from "express";
import pollGet from "../Controllers/pollGet.js";
import pollGetVote from "../Controllers/pollGetVote.js";
import pollPost from "../Controllers/pollPost.js";
import pollGetResult from "../Controllers/pollGetResult.js";
import pollSchema from "../schemas/pollSchema.js";

const pollRoutes = Router()

pollRoutes.post("/poll",pollPost)
pollRoutes.get("/poll",pollGet)
pollRoutes.get("/poll/:id/choice",pollGetVote)
pollRoutes.get("/poll/:id/result",pollGetResult)

export{ pollRoutes }