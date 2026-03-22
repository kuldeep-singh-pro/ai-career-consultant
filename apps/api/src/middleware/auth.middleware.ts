import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env";
import { Unauthorized } from "../errorHandler/httpError";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";

export const authMiddleware = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Unauthorized("Token missing");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      id: string;
    };

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new Unauthorized("User not found");
    }

    (req as any).user = user;

    next();
  }
);