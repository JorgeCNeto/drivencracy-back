import { Router } from "express";
import { pollGet, pollPost } from "../controllers/poll.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { pollSchema } from "../schemas/poll.schemas.js";

const pollRouter = Router()

pollRouter.post("/poll", validateSchema(pollSchema), pollPost)
pollRouter.get("/poll", pollGet)

export default pollRouter