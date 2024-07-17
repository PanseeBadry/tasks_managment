import Joi from "joi"

const addTaskSchema = Joi.object({
    title: Joi.string().min(6).max(30).required(),
    type: Joi.string().valid('text', 'list').required(),
    body: Joi.string().allow('').when('type', {
        is: 'text',
        then: Joi.required(),
        otherwise: Joi.forbidden()
    }),
    items: Joi.array().items(Joi.string()).when('type', {
    is: 'list',
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),
    shared: Joi.boolean(),
    category: Joi.string().hex().length(24)
  });

const getTaskByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required() 
});




const updateTaskSchema = Joi.object({
    title: Joi.string().min(3),
    type: Joi.string().valid('text', 'list'),
    body: Joi.string().allow('').when('type', {
        is: 'text',
        then: Joi.required(),
        otherwise: Joi.forbidden()
    }),
    items: Joi.array().items(Joi.string()).when('type', {
    is: 'list',
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),
    shared: Joi.boolean(),
    category: Joi.string().hex().length(24),
    id: Joi.string().hex().length(24).required()
});




export{
    addTaskSchema,
    getTaskByIdSchema,
    updateTaskSchema
    }

