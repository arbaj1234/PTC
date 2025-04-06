import mongoose from 'mongoose'
import Usermodel from '../Model/Schema.js';
export const Ragister = async (req, res) => {
    try {
        const existingUser=await Usermodel.findOne({email})
        if(existingUser){
            return res.status(403).json({message:'User already exists'})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await Usermodel.create({name,email,password});
        res.status(200).json({message:'Ragister successfull',user})
    } catch (error) {
        console.log(`Error in Ragister API`);
        res.status(404).json({message:'Error in Ragister API'})
    }
}