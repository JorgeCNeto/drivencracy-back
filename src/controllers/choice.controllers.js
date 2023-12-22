import { ObjectId } from "mongodb"
import { db } from "../database/database.connection.js"
import dayjs from "dayjs"

export async function choice(req, res) {
    const { title, pollId } = req.body    

    try {
        const verificarChoice = await db.collection("poll").findOne({title})

        if(verificarChoice){
            return res.status(409).send("Título já utilizado")
        }
        await db.collection("choice").insertOne({ title, pollId })
        return res.sendStatus(201)
    } catch {
        return res.status(500).send(err.message)
    }
}

export async function vote(req, res) {
    const { id } = req.params

    try {
        // const verificarChoice = await db.collection("choice").findOne({ _id: new ObjectId(id) })

        // if(verificarChoice){
        //     return res.sendStatus(404)
        // }

        // const verificarPoll = await db.collection("poll").findOne({ _id: new ObjectId(verificarChoice.id) })
        // if(verificarPoll){
        //     return res.sendStatus(404)
        // }

        const vote = { date: dayjs().format("YYYY-MM-DD HH:mm"), id}
        await db.collection("votes").insertOne({vote})
        return res.sendStatus(201)
    } catch {
        return res.status(500).send(err.message)
    }
}
