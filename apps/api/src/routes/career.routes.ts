import { Router } from "express";
import protect from "../middleware/auth.middleware";
import * as controller from "../controller/career.controller";

const router: Router = Router();

router.post("/generate", protect, controller.generateCareerPathController);
router.post("/generate-quick", protect, controller.generateQuickCareerPathController);
router.post("/roadmap/generate", protect, controller.generateRoadmapController);

router.get("/all", protect, controller.getCareerPathsController);
router.get("/all-with-progress", protect, controller.getCareerPathsWithProgressController);
router.get("/latest", protect, controller.getLatestCareerPathController);
router.get("/:id", protect, controller.getCareerPathDetailController);

router.patch("/:id/progress", protect, controller.updateProgressController);
router.patch("/:id/milestone", protect, controller.updateMilestoneController);
router.patch("/:id/resource", protect, controller.updateResourceController);
router.patch("/:id/status", protect, controller.updateStatusController);

router.delete("/:id", protect, controller.deleteCareerPathController);

export default router;