import { db } from "../database/database.connection.js"
import { pollSchema } from "../schemas/poll.schemas.js"

export async function pollPost(req, res) {
    const { title, expireAt } = req.body

    if(!expireAt){
        expireAt = dayjs().format("YYYY-MM-DD HH:mm").subtract(1, "month")
    }
   
    
    try{
        await db.collection("poll").insertOne({ title, expireAt })
        return res.sendStatus(201)

    } catch (err){
        return res.status(500).send(err.message)
    }
}

export async function pollGet(req, res) {
    try{
        const polls = await db.collection("poll").find({}).toArray()
        return res.send(polls)
    } catch (err){
        return res.status(500).send(err.message)
    }
}