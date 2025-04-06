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

export const loginUser=async(req,res)=>{
    try {
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(404).json({message:'All faild is requred'}) 
        }
        const user=await Usermodel.findOne({email});
        if(!email){
            return res.status(403).json({message:'User not found'})
        };
        const isMatch=await user.comparePass(password);
        if(isMatch){
            return res.status(400).send({message:'Invalid credentials'})
        }
        const token=user.generateToken();
        res.status(200).json({message:'Login successfuly',user,})
    } catch (error) {
        console.log(error);
        res.status(404).json({message:'Error in login API'})
    }
}

export const createUser=async(req,res)=>{
    try {
     const {name,email,password}=req.body;
     if(!name || !email || !password){
        return res.status(400).json({message:'please required all fields'})
     }
     const user=await Usermodel.create({name,email,password});
     res.status(200).json({
        message:'user create successfuly',user
     })        
    } catch (error) {
        console.log(error);
        res.status(400).json({message:'Error creating user',error})
    }
}
