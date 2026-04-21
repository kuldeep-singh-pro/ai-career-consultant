import { Router } from "express";

import protect from "../middleware/auth.middleware";

import {
  generateSkillGapAnalysisController,
  getSkillGapAnalysisController,
  deleteSkillGapAnalysisController,
} from "../controller/skillgap.controller";

import { validate } from "../middleware/validate.middleware";
import { SkillGapRequestDto } from "../dto/skillgap.dto";

const router: Router = Router();

router.post(
  "/analyze",
  protect,
  validate(SkillGapRequestDto),
  generateSkillGapAnalysisController
);

router.get(
  "/analysis",
  protect,
  getSkillGapAnalysisController
);

router.delete(
  "/analysis",
  protect,
  deleteSkillGapAnalysisController
);

export default router;