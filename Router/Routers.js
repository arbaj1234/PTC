import express from 'express';
import { Ragister } from '../Controller/Controller.js';

const router=express.Router();


router.post('/ragister',Ragister)


export default router