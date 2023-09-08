import { Router } from "express";
import { pollGet, pollGetChoice, pollGetResult, pollPost } from "../controllers/poll.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { pollSchema } from "../schemas/poll.schemas.js";

const pollRouter = Router()

pollRouter.post("/poll", validateSchema(pollSchema), pollPost)
pollRouter.get("/poll", pollGet)
pollRouter.get("/poll", pollGetChoice)
pollRouter.get("/poll", pollGetResult)

export default pollRouter