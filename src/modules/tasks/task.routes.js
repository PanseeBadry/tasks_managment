import express from 'express'
import { addTask, deleteTask, getAllTasks, getTaskById, updateTask } from './controller/task.controller.js'
import { auth } from '../../middleware/auth.js'
import { validation } from '../../middleware/validation.js'
import { addTaskSchema,  getTaskByIdSchema, updateTaskSchema } from './controller/task.validator.js'

export const taskRoutes = express.Router()

taskRoutes.post('/addTask',auth,validation(addTaskSchema), addTask)
taskRoutes.get('/getAllTasks',getAllTasks)
taskRoutes.get('/getTaskById/:id',auth,validation(getTaskByIdSchema),getTaskById)
taskRoutes.put('/updateTask/:id',auth,validation(updateTaskSchema),updateTask)
taskRoutes.delete('/deleteTask/:id',auth,validation(getTaskByIdSchema),deleteTask)