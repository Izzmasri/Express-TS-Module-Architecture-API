import jwt from "jsonwebtoken";
import { User } from "../../users/users.entity";

const JWT_SECRET_KEY = process.env.JWT_SECRET as string;
if (!JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}
const EXPIRES_IN = "7d";

export interface Jwt_Payload {
  id: string;
  role: User["role"];
  email: string;
}

export const signJwt = (payload: Jwt_Payload) => {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: EXPIRES_IN });
};

export const verifyJwt = (token: string): Jwt_Payload => {
  return jwt.verify(token, JWT_SECRET_KEY) as Jwt_Payload;
};
