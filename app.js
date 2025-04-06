import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import { connectDB } from './db/connectDB.js';

const app=express();


connectDB()

const port=process.env.port||5463;

app.listen(port,()=>{
    console.log(`sarver statt ar ${port}`);
})