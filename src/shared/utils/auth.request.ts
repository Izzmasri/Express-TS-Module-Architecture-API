import { Request } from "express";
import { Jwt_Payload } from "./jwt.util";

export interface AuthRequest extends Request {
  user?: Jwt_Payload;
}
