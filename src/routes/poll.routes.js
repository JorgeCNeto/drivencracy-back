import { Router } from "express";

const pollRouter = Router()

pollRouter.post("/poll")
pollRouter.get("/poll")

export default pollRouter