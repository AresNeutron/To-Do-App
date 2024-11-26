import mongoose, { Schema, model, Document } from "mongoose";

// Interfaz en TypeScript
interface TaskInterface extends Document {
  name: string;
  description: string;
  date: Date;
  important: boolean;
  completed: boolean;
}

// Esquema de Mongoose
const todoSchema = new Schema<TaskInterface>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  important:{
    type: Boolean,
    required: false,
    default:false,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Modelo
const TaskModel = mongoose.models.TaskModel || model<TaskInterface>("Todo", todoSchema);

export default TaskModel;
