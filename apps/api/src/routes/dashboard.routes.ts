import { Router } from "express";
import protect from "../middleware/auth.middleware";
import {
  getDashboardStatsController,
  getDashboardOverviewController,
  getProgressAnalyticsController,
  getSkillAnalyticsController,
} from "../controller/dashboard.controller";

const router: Router = Router();

router.get("/stats", protect, getDashboardStatsController);

router.get("/overview", protect, getDashboardOverviewController);

router.get("/progress", protect, getProgressAnalyticsController);

router.get("/skills", protect, getSkillAnalyticsController);

export default router;
