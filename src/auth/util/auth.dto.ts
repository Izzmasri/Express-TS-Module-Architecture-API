import { User } from "../../users/users.entity";

export type LoginDTO = {
  email: string;
  password: string;
};

export type LoginResponseDTO = Omit<User, "password">;

export type RegisterDTO = Pick<User, "name" | "email" | "password">;
export type RegisterResponseDTO = Omit<User, "password">;
