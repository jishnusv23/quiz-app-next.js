import mongoose, { Schema, Document, model, mongo } from "mongoose";

export interface IQuiz extends Document {
  title: string;
  thumbnail: string;
  description?: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  timeLimit: number;
  isPublic: boolean;
  authorId?: mongoose.Types.ObjectId;
  questions: mongoose.Types.ObjectId[];
  createdAt: Date;
  updateAt: Date;
}

const quizSchema = new Schema<IQuiz>({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  thumbnail: { type: String, required: true, trim: true },
  description: { type: String, trim: true, maxlength: 200 },
  category: {
    type: String,
    trim: true,
    required: true,
    enum: ["Java", "JavaScript", "React", "HTML", "DS", "MongoDB", "Node"],
  },
  difficulty: {
    type: String,
    trim: true,
    enum: ["easy", "medium", "hard"],
    default: "easy",
  },

  timeLimit: { type: Number, min: 1, max: 200 },
  isPublic: { type: Boolean, default: true },
  authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
},{timestamps:true});
