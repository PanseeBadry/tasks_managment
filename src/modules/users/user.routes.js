import express from 'express'
import { signUp,signIn } from './controller/user.controller.js'
import { validation } from '../../middleware/validation.js'
import { signInSchema, signUpSchema } from './controller/user.validator.js'

export const userRoutes = express.Router()



userRoutes.post('/signUp',validation(signUpSchema),signUp)
userRoutes.post('/signIn',validation(signInSchema),signIn)