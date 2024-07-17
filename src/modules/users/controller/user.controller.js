import { userModel } from "../../../../database/models/user.model.js"
import { handleError } from "../../../middleware/handleAsyncError.js";
import bcrypt from 'bcrypt'
import { appError } from "../../../utilis/appError.js";
import jwt from "jsonwebtoken" 
export const signUp =async (req,res,next)=>{
    const foundUser = await userModel.findOne({email:req.body.email});
    if(foundUser){
        next(new appError(`user already exists`,409))
        
    }else{
        let user = new userModel(req.body)
        await user.save()
        res.json({message:"success",user})
    }
  }

  export const signIn = handleError(async (req,res,next)=>{

    let{email,password}= req.body
    const foundUser = await userModel.findOne({email});
    if(foundUser){
        let matched = await bcrypt.compare(password, foundUser.password);
        if (matched) {
            let token = jwt.sign({name:foundUser.name, id: foundUser._id,role:foundUser.role }, process.env.SECRET_KEY)
            res.json({ message: "signIn successfully", token })  
        } else {
            next(new appError(`wrong password`,401))

        }
    }else{
   next(new appError(`user not found`,404))
    }
})




