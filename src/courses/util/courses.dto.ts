import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().optional(),
});

export const updateCourseSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  image: z.string().optional(),
});

export type CreateCourseDTO = z.infer<typeof createCourseSchema>;
export type UpdateCourseDTO = z.infer<typeof updateCourseSchema>;
