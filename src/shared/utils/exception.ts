import type { Response } from "express";
import { ModuleNameType } from "./constant";
import { HttpErrorStatus } from "./util.types";

export class CustomError extends Error {
  public errorType = "custom";
  constructor(
    msg: string,
    public moduleName: ModuleNameType,
    public statusCode: HttpErrorStatus
  ) {
    super(msg);
  }
}

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof CustomError) {
    console.log("CustomError", error);
    res.status(error.statusCode).send(error.message);
    return;
  }
  console.log(error);
  // to alert ourself
  res.status(500).send("internal error");
};
