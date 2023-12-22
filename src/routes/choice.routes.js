import { Router } from "express";
import { choice, vote, getChoice } from "../controllers/choice.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { choiceSchema } from "../schemas/choice.schemas.js";

const choiceRouter = Router()

choiceRouter.post("/choice", validateSchema(choiceSchema), choice)
choiceRouter.post("/choice/:id/vote", vote)
choiceRouter.get("/poll/:id/choice", getChoice)

export default choiceRouter