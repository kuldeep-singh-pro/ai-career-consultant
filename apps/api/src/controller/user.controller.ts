import { Request, Response } from "express";
import { User } from "../models/user.model";

export const getCurrentUserController = async (
  req: Request,
  res: Response
) => {
  const user = await User.findById(req.user.id).select(
    "-password"
  );

  res.json({
    success: true,
    data: user
  });
};

export const updateCurrentUserController = async (
  req: Request,
  res: Response
) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true }
  ).select("-password");

  res.json({
    success: true,
    data: updatedUser
  });
};

export const uploadProfilePictureController = async (
  req: Request,
  res: Response
) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      profilePicture: req.file?.path
    },
    { new: true }
  );

  res.json({
    success: true,
    data: updatedUser
  });
};