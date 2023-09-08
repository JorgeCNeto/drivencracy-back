import { ObjectId } from "mongodb"
import { db } from "../database/database.connection.js"

export async function choice(req, res) {
    const { title } = req.body
    const { id } = res.locals

    try {
        const verificarChoice = await db.collection("choice").findOne({title})

        if(verificarChoice){
            return res.status(409).send("Título já utilizado")
        }
        await db.collection("choice").insertOne({ title, pollId: id })
        return res.sendStatus(201)
    } catch {
        return res.status(500).send(err.message)
    }
}