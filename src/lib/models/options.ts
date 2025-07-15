import mongoose, { Schema, model, Document } from "mongoose";

export interface IOption extends Document {
  text: string;
  isCorrect: boolean;
}

export const optionSchema = new Schema<IOption>({
  text: { type: String, required: true, trim: true },
  isCorrect: { type: Boolean, required: true, default: false },
});

export const OptionModel = mongoose.models.Option || model<IOption>("Option",optionSchema);
