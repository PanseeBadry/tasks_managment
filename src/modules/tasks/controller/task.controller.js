import { categoryModel } from "../../../../database/models/category.model.js";
import { taskModel } from "../../../../database/models/task.model.js";
import { userModel } from "../../../../database/models/user.model.js";
import { handleError } from "../../../middleware/handleAsyncError.js";
import apiFeatures from "../../../utilis/apiFeature.js";
import { appError } from "../../../utilis/appError.js";

//user who logged in who must add his task into the category provided in req.body
export const addTask = handleError(async (req, res, next) => {
  const { userId } = req.user;
  const { title, type, body, items,shared, category } = req.body;
  const foundCategory = await categoryModel.findById(category);
  if(foundCategory){
    if (userId.equals(foundCategory.user) ) {
        let newTask = new taskModel({
          title,
          type,
          body,
          items,
          shared,
          category,
          user: userId,
        });
        let added = await newTask.save();
        res.json({ message: "added", added });
      } else {
        next(new appError(`Unauthorized`, 401));
      }
  }else{
    next(new appError(`category not found`,404))
  }
  //make sure to add the task into the correct category belongs to the creator
  
});
//get all tasks of all users that can be shared if shared is false we can't view it
export const getAllTasks = handleError(async (req, res, next) => {
  let apiFeature = new apiFeatures(
    taskModel.find({ shared: true }).populate("category"),
    req.query
  )
    .pagination()
    .filter();
  let allSharedTasks = await apiFeature.mongooseQuery.exec();
  res.json({ message: "success", allSharedTasks });
});
//check if the task is private or not , if not private check if the creator is looged in , if not no one can view it
export const getTaskById = handleError(async (req, res, next) => {
  const { userId } = req.user;
  let foundTask = await taskModel.findById(req.params.id).populate("category");
    if (foundTask) {
        if ((foundTask.shared === false &&  foundTask.user.equals(userId))    || (foundTask.shared==true)) {
          res.json({ message: "success", foundTask });
        } else {
          next(new appError(`Unauthorized`, 401));
        }
      } else {
        next(new appError("task not found", 404));
      }
 
});
// task creator must be the one who updates it
export const updateTask = handleError(async (req, res, next) => {
  const { userId } = req.user;
  const { title, type, body, items,shared, category } = req.body;
  let foundTask = await taskModel.findById(req.params.id);
  //make sure that the task belonged to the correct creator
  if (foundTask.user.equals(userId)) {
    //make sure that if i update the category of the task , to be updated to the correct user
    if (foundTask.category.equals(category) || category == null) {
      foundTask= await taskModel.findByIdAndUpdate(foundTask.id ,  { title, type, body, items,shared, category:foundTask.category }, {new: true,});
      res.json({ message: "updated successfully", foundTask });
    } else {
      next(new appError("Unauthorized wrong category doesnot belog to the user",401));
    }
  } else {
    next(new appError(`Unauthorized wrong user`, 401));
  }
});
// task creator must be the one who deletes it
export const deleteTask = handleError(async(req,res,next)=>{
    const {userId} = req.user
    let foundTask = await taskModel.findById(req.params.id)
    if(foundTask){
        if(foundTask.user.equals(userId)){
            await taskModel.findByIdAndDelete(req.params.id)        
            foundTask && res.json({message:"deleted successfully",foundTask})
            !foundTask && next(new appError('Task not found',404)) 
        }else{
            next(new appError('Unauthorized wrong user',401))
        }
    }else{
        next(new appError(`task not found`,404))
    }
    
  
    

})  



