
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  assignedTo: { type: String, required: true },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
  dueDate: { type: String, required: true },
  priority: { type: String, enum: ['Low', 'Normal', 'High'], default: 'Normal' },
  comments: { type: String, default: '' }
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

// Use ESM export
export default Task;
