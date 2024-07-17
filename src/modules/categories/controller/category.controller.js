import { categoryModel } from "../../../../database/models/category.model.js"
import { userModel } from "../../../../database/models/user.model.js"
import { handleError } from "../../../middleware/handleAsyncError.js"
import apiFeatures from "../../../utilis/apiFeature.js"
import { appError } from "../../../utilis/appError.js"



export const addCategory = handleError(async(req,res,next)=>{ 
    const {userId} = req.user
    const foundUser = await userModel.findById(userId)
    if(foundUser){
        const foundCategory = await categoryModel.findOne({name:req.body.name , user:userId})
        if(foundCategory){
            next(new appError(`category already exists`,409))
        }else{
            let newCategory = new categoryModel({name:req.body.name,user:userId})
            let added = await newCategory.save()
            res.json({message:"added successfully",added}) 
        }
    }else{
        next(new appError(`Unautharized`,401))
    }
    

    
    
})
//get all categories of all users 
export const getAllCategories = handleError(async (req,res,next)=>{

        let apiFeature=  new apiFeatures(categoryModel.find().populate('user'),req.query).pagination().filter()
        let allCategories = await apiFeature.mongooseQuery.exec()
         res.json({message:"success",allCategories})
    

    
})

export const getCategoryById = handleError(async(req,res,next)=>{

        let category = await categoryModel.findById(req.params.id).populate('user')
        if(category){
            res.json(category)
        }else{
            next(new appError('category not found',404)) 
        }   
})
// category creator must be the one who updates it
export const updateCategory = handleError(async(req,res,next)=>{
    const {userId} = req.user
    let foundCategory = await categoryModel.findById(req.params.id)
    if(foundCategory){
        if(userId.equals(foundCategory.user)){
            let updatedCategory = await categoryModel.findByIdAndUpdate(foundCategory.id,{name:req.body.name},{new:true})
            res.json({message:"updated successfully",updatedCategory})
        }else{
            next(new appError(`Unauthorized`,401))
        }

    }else{
        next(new appError(`category not found`,404))
    }
       
})
// category creator must be the one who deletes it
export const deleteCategory = handleError(async(req,res,next)=>{
    const {userId} = req.user
    let foundCategory = await categoryModel.findById(req.params.id)
    if(foundCategory){
        if(userId.equals(foundCategory.user)){
            let deletedCategory = await categoryModel.findByIdAndDelete(foundCategory.id)
            res.json({message:"deleted successfully",deletedCategory})
        }else{
            next(new appError(`Unauthorized`,401))
        }

    }else{
        next(new appError(`category not found`,404))
    }
       
})  


