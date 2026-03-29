import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { HttpError } from "../errorHandler/httpError";

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: err.errors[0]?.message || "Validation error",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};