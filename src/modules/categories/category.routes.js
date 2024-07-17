import express from 'express'
import { addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from './controller/category.controller.js'
import { auth } from '../../middleware/auth.js'
import { validation } from '../../middleware/validation.js'
import { addCategorySchema, getCategoryByIdSchema, updateCategorySchema } from './controller/category.validator.js'

export const categoryRoutes = express.Router()

categoryRoutes.post('/addCategory',auth,validation(addCategorySchema), addCategory)
categoryRoutes.get('/getAllCategories',getAllCategories)
categoryRoutes.get('/getCategoryById/:id',validation(getCategoryByIdSchema),getCategoryById)
categoryRoutes.put('/updateCategory/:id',auth,validation(updateCategorySchema),updateCategory)
categoryRoutes.delete('/deleteCategory/:id',auth,validation(getCategoryByIdSchema),deleteCategory)

