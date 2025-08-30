import { Request, Response } from "express";
import { zodValidation } from "../shared/middlewares/zod.middleware";
import { HttpErrorStatus, StringObject } from "../shared/utils/util.types";
import { AuthService } from "./auth.service";
import {
  LoginDTO,
  LoginResponseDTO,
  RegisterDTO,
  RegisterResponseDTO,
} from "./util/auth.dto";
import { loginDTOSchema, registerDTOSchema } from "./util/auth.schema";
import { handleError } from "../shared/utils/exception";

export class AuthController {
  private authService = new AuthService();

  public async register(
    req: Request<StringObject, StringObject, RegisterDTO>,
    res: Response<RegisterResponseDTO | any>
  ) {
    try {
      const payloadData = zodValidation(registerDTOSchema, req.body, "AUTH");
      const user = await this.authService.register(payloadData);
      res.json(user);
    } catch (error) {
      handleError(error, res);
    }
  }
  public async login(
    req: Request<StringObject, StringObject, LoginDTO>,
    res: Response<LoginResponseDTO | any>
  ) {
    try {
      const payloadData = zodValidation(loginDTOSchema, req.body, "AUTH");
      const { token, user } = await this.authService.login(payloadData);
      res.json({ token, user });
    } catch (error) {
      handleError(error, res);
    }
  }
}
