import mongoose, { Schema, Document } from "mongoose";

interface PartnerPreferences {
  minAge?: number;
  maxAge?: number;
  gender?: string;
  location?: string;
  religion?: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  age?: number;
  gender?: string;
  location?: string;
  religion?: string;
  hobbies?: string[];
  education?: string;
  profession?: string;
  isVerified: boolean;
  createdAt: Date;
  partnerPreferences?: PartnerPreferences;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: Number,
    gender: String,
    location: String,
    religion: String,
    hobbies: [String],
    education: String,
    profession: String,
    partnerPreferences: {
      minAge: Number,
      maxAge: Number,
      gender: String,
      location: String,
      religion: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
