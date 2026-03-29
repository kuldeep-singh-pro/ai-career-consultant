import { Router } from "express";

import {
  uploadResumeController,
  getResumeAnalysisController,
} from "../controller/resume.controller";

import protect from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

const router: Router = Router();

router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadResumeController
);

router.get(
  "/analysis",
  protect,
  getResumeAnalysisController
);

export default router;