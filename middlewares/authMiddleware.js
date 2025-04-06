import JWT from 'jsonwebtoken';
import Usermodel from '../Model/Schema.js';
export const isAuth=async(req,res,next)=>{
    const {token}=req.cookies;
    //validation
    if(!token){
        return res.status(404).send({
            success:false,
            message:'UnAuthorized user'
        })
    }
    const decodeData=JWT.verify(token,process.env.JWT_SECRET);
    req.user=await Usermodel.findById(decodeData._id);
    next();
}