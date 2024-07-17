import {model , Schema} from "mongoose"
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});


userSchema.pre("save",function (){
    // console.log(this)
    if(this.password) this.password = bcrypt.hashSync(this.password,7) 
})
userSchema.pre("findOneAndUpdate",function (){
    // console.log(this)
    if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password ,7) 

    
})

export const userModel = model('User',userSchema)