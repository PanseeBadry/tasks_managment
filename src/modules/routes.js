import { categoryRoutes } from "./categories/category.routes.js"
import { taskRoutes } from "./tasks/task.routes.js"
import { userRoutes } from "./users/user.routes.js"






export const allRoutes=(app)=>{
    app.use('/user',userRoutes)
    app.use('/category',categoryRoutes)
    app.use('/task',taskRoutes)


}