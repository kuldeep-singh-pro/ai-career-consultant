import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model";
import { env } from "../config/env";

import {
  Conflict,
  Unauthorized,
  NotFound,
  BadRequest,
} from "../errorHandler/httpError";

export const registerUserService = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await User.findOne({ email }).lean();

  if (existingUser) {
    throw new Conflict("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isVerified: false,
  });

  return user;
};

export const verifyUserService = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound("User not found");
  }

  user.isVerified = true;

  await user.save();

  return user;
};

export const loginUserService = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Unauthorized("Invalid credentials");
  }

  if (!user.isVerified) {
    throw new Unauthorized("Account not verified");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Unauthorized("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRE,
    }
  );

  return {
    user,
    token,
  };
};

export const checkUserForOtpResendService = async (
  email: string
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound("User not found");
  }

  if (user.isVerified) {
    throw new BadRequest("User already verified");
  }

  return user;
};

export const resetPasswordService = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new NotFound("User not found");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;

  await user.save();

  return true;
};