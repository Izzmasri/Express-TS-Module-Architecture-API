import mongoose, { ObjectId } from "mongoose";

export interface User {
  id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "COACH" | "STUDENT" | undefined;
  createdAt: Date;
  updatedAt: Date;
  course: mongoose.Types.ObjectId[];
}
