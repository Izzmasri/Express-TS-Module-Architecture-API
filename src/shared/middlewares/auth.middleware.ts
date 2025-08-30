import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/jwt.util";
import { HttpErrorStatus } from "../utils/util.types";
import { AuthRequest } from "../utils/auth.request";

export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer")) {
    return res
      .status(HttpErrorStatus.Unauthorized)
      .json({ message: "No token" });
  }
  const token: string = header.split(" ")[1]!;
  try {
    const payload = verifyJwt(token);
    req.user = payload;
    next();
  } catch {
    return res
      .status(HttpErrorStatus.Unauthorized)
      .json({ message: "Invalid token" });
  }
};

export const authorizeRoles =
  (...roles: Array<"ADMIN" | "COACH" | "STUDENT">) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res
        .status(HttpErrorStatus.Unauthorized)
        .json({ message: "No token" });
    }
    if (!user.role || !roles.includes(user.role)) {
      return res
        .status(HttpErrorStatus.Forbidden)
        .json({ message: "Forbidden" });
    }
    next();
  };
