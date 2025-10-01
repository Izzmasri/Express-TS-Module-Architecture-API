import mongoose, { ObjectId } from "mongoose";

export interface Course {
  id: ObjectId;
  title: string;
  description: string;
  image?: string | undefined;
  coach?: mongoose.Types.ObjectId;
  students: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
