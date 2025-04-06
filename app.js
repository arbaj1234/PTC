import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import { connectDB } from './db/connectDB.js';
import router from './Router/Routers.js';

const app=express();


connectDB()

app.use(express.json())
app.use('/api',router)

const port=process.env.port||5463;

app.listen(port,()=>{
    console.log(`sarver statt ar ${port}`);
})