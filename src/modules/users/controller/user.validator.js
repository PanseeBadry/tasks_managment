import Joi from "joi";

const signUpSchema = Joi.object({
  name: Joi.string().min(4).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});
const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});



export{
    signInSchema,
    signUpSchema

}
