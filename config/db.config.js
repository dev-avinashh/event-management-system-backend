import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGO_DB_URI


export const connectDatabase = async () =>{
    try {
        await mongoose.connect(uri)
    } catch (error) {
        console.error("Unable to connect", error)
        throw error
        
    }
}