import {Schema , model} from 'mongoose';

const categorySchema = new Schema({
  name: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
},{timestamps:true});

export const categoryModel = model('Category',categorySchema)
