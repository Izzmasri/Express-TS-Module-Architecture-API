import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: z
    .string()
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please provide a valid email address"
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["ADMIN", "COACH", "STUDENT"]).optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .optional(),
  role: z.enum(["ADMIN", "COACH", "STUDENT"]).optional(),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
