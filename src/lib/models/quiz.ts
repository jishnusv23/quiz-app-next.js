import mongoose, { Schema, Document, model, mongo } from "mongoose";
import { IQuestion } from "./question";

export interface IQuiz extends Document {
  title: string;
  thumbnail: string;
  description?: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  duration: number;
  isPublic: boolean;
  authorId?: mongoose.Types.ObjectId;
  questions: IQuestion[];
  createdAt: Date;
  updateAt: Date;
}

const quizSchema = new Schema<IQuiz>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    thumbnail: { type: String, required: true, trim: true },
    description: { type: String, trim: true, maxlength: 200 },
    category: {
      type: String,
      trim: true,
      required: true,
      enum: [
        "Frontend",
        "Backend",

        "Database",

        "JavaScript",
        "React",
        "HTML",
        "DS",
        "MongoDB",
        "Node",
      ],
    },
    difficulty: {
      type: String,
      trim: true,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    duration: { type: Number, min: 1, max: 200 },
    isPublic: { type: Boolean, default: true },
    
     questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  },
  { timestamps: true }
);
const QuizModel = mongoose.models.Quiz || model<IQuiz>("Quiz", quizSchema);
export { QuizModel };