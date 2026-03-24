import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";
import { uploadResumeController } from "../controller/resume.controller";

const router = Router();

router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResumeController
);

export default router;