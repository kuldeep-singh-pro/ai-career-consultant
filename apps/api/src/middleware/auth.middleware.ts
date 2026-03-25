import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env";
import { Unauthorized } from "../errorHandler/httpError";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";
import { AuthRequest } from "../types/auth.types";

interface JwtPayload {
  id: string;
}

const protect = asyncHandler(
  async (req: AuthRequest, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new Unauthorized("Token missing or malformed");
    }

    const token = authHeader.split(" ")[1];

    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    } catch {
      throw new Unauthorized("Invalid or expired token");
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new Unauthorized("User not found");
    }

    req.user = user as any;

    next();
  }
);

export default protect;