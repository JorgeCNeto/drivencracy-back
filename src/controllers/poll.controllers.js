import { ObjectId } from "mongodb"
import { db } from "../database/database.connection.js"
import dayjs from "dayjs"

export async function pollPost(req, res) {
    const { title } = req.body

    if(!expireAt){
        expireAt = dayjs().add(1, "month").format("YYYY-MM-DD HH:mm")
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

export async function pollGetChoice(req, res) {
    const { id } = req.params

    try{
        const polls = await db.collection("choice").find({ pollId: new ObjectId(id) }).toArray()
        if (!polls){
            return res.sendStatus(404)
        }

        return res.send(polls)
    } catch (err){
        return res.status(500).send(err.message)
    }
}

export async function pollGetResult(req, res) {
    const { id } = req.params

    try{
        const polls = await db.collection("poll").find({_id: new ObjectId(id)}).toArray()
        const poll = await db.collection("choice").find({pollId: id}).toArray()
        const votes = poll.result.length

        const enquete = {
            _id: id,
            title: polls.title,
            expireAt: polls.expireAt,
            result:{
                title: poll.title,
                votes: votes
            }
        }
        return res.send(enquete)
    } catch (err){
        return res.status(500).send(err.message)
    }
} 