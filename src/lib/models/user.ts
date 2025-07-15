import { Password } from "@/services/password/password";
import mongoose, { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  playedQuiz: mongoose.Types.ObjectId[];
  isAdmin: boolean;
  isVerified: boolean;
  createdAt: Date;
  updateAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, trim: true, maxlength: 15 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, minlength: 6,default:null },
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.pre("save", async function (done) {
  if (this.isModified("password") && this.get("password")) {
    const hashed = await Password.toHash(this.get("password") as string);
    this.set("password", hashed);
  }
  done();
});

export const UserModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema);