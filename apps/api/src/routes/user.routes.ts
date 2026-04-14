import { Router } from "express";
import protect from "../middleware/auth.middleware";
import {
  getCurrentUserController,
  updateCurrentUserController,
  uploadProfilePictureController,
} from "../controller/user.controller";
import { upload } from "../middleware/upload.middleware";

const router: Router = Router();

router.get("/me", protect, getCurrentUserController);

router.patch("/me", protect, updateCurrentUserController);

router.post(
  "/upload-picture",
  protect,
  upload.single("profilePicture"),
  uploadProfilePictureController
);

export default router;