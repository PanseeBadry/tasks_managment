import Joi from "joi"

const addCategorySchema = Joi.object({
    name: Joi.string().min(6).required(),
    user: Joi.string().hex().length(24).required(), 
});

const getCategoryByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
})
const updateCategorySchema = Joi.object({
    name: Joi.string().min(6).required(), 
    id: Joi.string().hex().length(24).required(),    
});






export{
    addCategorySchema,
    updateCategorySchema,
    getCategoryByIdSchema

}

