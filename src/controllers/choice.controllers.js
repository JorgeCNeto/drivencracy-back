import { db } from "../database/database.connection.js"

export async function choice(req, res) {
    const { title } = req.body
    const { id } = req.params

    try {
        
    } catch {
        return res.status(500).send(err.message)
    }
}