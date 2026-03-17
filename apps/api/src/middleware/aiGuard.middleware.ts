import { Request, Response, NextFunction, RequestHandler } from "express";

export const aiGuard: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { question } = req.body;

  if (!question) {
    res.status(400).json({
      success: false,
      error: "Question is required",
    });
    return;
  }

  if (question.length > 300) {
    res.status(400).json({
      success: false,
      error: "Question too long",
    });
    return;
  }

  if (question.toLowerCase().includes("hack")) {
    res.status(403).json({
      success: false,
      error: "Restricted content",
    });
    return;
  }

  next();
};