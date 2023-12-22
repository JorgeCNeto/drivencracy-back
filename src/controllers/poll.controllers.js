import { ObjectId } from "mongodb"
import { db } from "../database/database.connection.js"
import dayjs from "dayjs"

export async function pollPost(req, res) {
    const body = req.body

    let date = body.expireAt

    if(!body.expireAt || body.expireAt === ""){
        date = dayjs().add(1, "month").format("YYYY-MM-DD HH:mm")
    }
   
    
    try{
        await db.collection("poll").insertOne({ title: body.title, expireAt: date })
        return res.sendStatus(201)

    } catch (err){
        return res.status(500).send(err.message)
    }
}

export async function pollGet(req, res) {
    try{
        const polls = await db.collection("poll").find().toArray()
        return res.send(polls)
    } catch (err){
        return res.status(500).send(err.message)
    }
}

export async function pollGetChoice(req, res) {
    const params = req.params

    try{
        const polls = await db.collection("choice").find({ pollId: params.id }).toArray()
         
        return res.send(polls)
    } catch (err){
        return res.status(500).send(err.message)
    }
}

export async function pollGetResult(req, res) {
    const {id} = req.params
    const poll = res.locals.poll

    try{
        const polls = await db.collection("poll").find({_id: id}).toArray()
                        
        
        const votes = polls.map(v => v._id)

        let vote = "";
        let count = 0;
        for (let i = 0; i < votes.length; i++) {

            let countArray = await db.collection('votes').find({ choiceId: votes[i].toString() }).toArray()
            let votesTotal = countArray.length

            if (count < votesTotal) {
                count = votesTotal;
                vote = votes[i]
            }
        }
 

        const enquete = {
            _id: poll._id,
            title: poll.title,
            expireAt: poll.expireAt,
            result:{
                title: vote,
                votes: count
            }
        }
        return res.send(enquete)
    } catch (err){
        return res.status(500).send(err.message)
    }
} 