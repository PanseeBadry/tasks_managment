import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  title: String,
  type: { type: String, enum: ['text', 'list'] },
  body: String,
  items: [String], // Only for list type tasks
  shared: { type: Boolean, default: false },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

export const taskModel = model('Task',taskSchema)
