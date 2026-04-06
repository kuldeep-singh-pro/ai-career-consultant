import { Router } from "express";
import protect from "../middleware/auth.middleware";
import {
  generateCareerPathController,
  generateRoadmapController,
  getCareerPathsController,
  getLatestCareerPathController,
  getCareerPathDetailController,
  updateProgressController,
  updateMilestoneController,
  updateResourceController,
  updateStatusController,
  deleteCareerPathController,
  getCareerPathsWithProgressController,
  generateQuickCareerPathController,
} from "../controller/career.controller";
import { validate } from "../middleware/validate.middleware";
import {
  GenerateCareerPathRequestDto,
  GenerateRoadmapRequestDto,
} from "../dto/career.dto";

const router: Router = Router();

router.post(
  "/generate",
  protect,
  validate(GenerateCareerPathRequestDto),
  generateCareerPathController
);

router.post(
  "/generate-quick",
  protect,
  generateQuickCareerPathController
);

router.post(
  "/roadmap/generate",
  protect,
  validate(GenerateRoadmapRequestDto),
  generateRoadmapController
);

router.get("/all", protect, getCareerPathsController);

router.get("/all-with-progress", protect, getCareerPathsWithProgressController);

router.get("/latest", protect, getLatestCareerPathController);

router.get("/:id", protect, getCareerPathDetailController);

router.patch("/:id/progress", protect, updateProgressController);

router.patch("/:id/milestone", protect, updateMilestoneController);

router.patch("/:id/resource", protect, updateResourceController);

router.patch("/:id/status", protect, updateStatusController);

router.delete("/:id", protect, deleteCareerPathController);

export default router;
