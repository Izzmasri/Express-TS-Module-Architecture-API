import { ZodError, ZodType } from "zod";
import { ModuleNameType } from "../utils/constant";
import { CustomError } from "../utils/exception";
import { HttpErrorStatus } from "../utils/util.types";

export const zodValidation = <T>(
  schema: ZodType<T>,
  payload: T,
  moduleName: ModuleNameType
) => {
  try {
    const safeData = schema.parse(payload);
    return safeData;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new CustomError(
        error.message,
        moduleName,
        HttpErrorStatus.BadRequest
      );
    }
    throw error;
  }
};
