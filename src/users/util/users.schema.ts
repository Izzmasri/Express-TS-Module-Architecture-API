import { z, ZodType } from "zod";
import { User } from "../users.entity";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: z
    .string()
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please provide a valid email address"
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["ADMIN", "COACH", "STUDENT"]),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies ZodType<User>;
