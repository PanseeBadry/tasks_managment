import 'dotenv/config.js'
import express from 'express'
import { connection } from './database/connection.js'
import { allRoutes } from './src/modules/routes.js'
import { appError } from './src/utilis/appError.js'

const app = express()
const port = 3000

app.use(express.json())

connection()
allRoutes(app)
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.statusCode).json({message:err.message,stack:err.stack})
  })
app.use("*",(req,res,next)=>{
    next(new appError("url not found",404))
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))