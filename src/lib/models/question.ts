import mongoose, { Schema, model, Document } from "mongoose";
import { IOption, optionSchema } from "./options";

export interface IQuestion extends Document {
  questionText: string;
  options: IOption[];
}

const questionSchema = new Schema<IQuestion>(
  {
    questionText: { type: String, required: true, trim: true },
    options: [optionSchema],
  },
  { timestamps: true }
);

questionSchema.index({ questionText: "text" });

export const QuestionModel =
  mongoose.models.Qestion || model<IQuestion>("Question",questionSchema);
