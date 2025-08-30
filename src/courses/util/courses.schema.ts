import { z, ZodType } from "zod";
import { Course } from "../courses.entity";

export const courseSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies ZodType<Course>;
