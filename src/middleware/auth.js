//user must login first ==> middleware
import  jwt  from "jsonwebtoken"

import { userModel } from "../../database/models/user.model.js"
import { appError } from "../utilis/appError.js"

export const auth = (req,res,next)=>{
let token=req.header('token')
jwt.verify(token,process.env.SECRET_KEY,async(err,decodded)=>{
    if(err){
        res.json({message:"err",err})
    }else{
        const user = await userModel.findById(decodded.id)
        if(!user){
            return next(new appError(`Unauthorized user not found`,404))
        }
        req.user ={
        userId: user._id       
        }
        next()
       
    }
})


}
