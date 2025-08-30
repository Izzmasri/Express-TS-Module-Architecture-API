import z, { ZodType } from "zod";
import { userSchema } from "../../users/util/users.schema";
import { LoginDTO, RegisterDTO } from "./auth.dto";

export const registerDTOSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
  // name: z.string().min(4, "Name must be at least 4 characters"),
  // email: z
  //   .string()
  //   .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email address"),
  // password: z.string().min(6, "Password must be at least 6 characters"),
}) satisfies ZodType<RegisterDTO>;

export const loginDTOSchema: ZodType<LoginDTO> = z.object({
  email: z
    .string()
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please provide a valid email address"
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
