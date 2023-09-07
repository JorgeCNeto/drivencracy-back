import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config()

const MongoClient = new MongoClient(process.env.DATABASE_URL)
try {
    await MongoClient.connect()
    console.log("MongoDB conectado!")
} catch (err) {
    console.log(err.message)
}

export const db = MongoClient.db()