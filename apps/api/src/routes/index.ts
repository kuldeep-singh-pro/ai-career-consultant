import { Router } from "express";
import authRoutes from "./auth.routes";
import resumeRoutes from "./resume.routes";
import skillgapRoutes from "./skillgap.routes";
import careerRoutes from "./career.routes";
import mentorRoutes from "./mentor.routes";
import settingRoutes from "./setting.routes";
import dashboardRoutes from "./dashboard.routes"
import userRoutes from "./user.routes";;

const router: Router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "API running",
  });
});

router.use("/auth", authRoutes);
router.use("/resume", resumeRoutes);
router.use("/skillgap", skillgapRoutes);
router.use("/career", careerRoutes);
router.use("/mentor", mentorRoutes);
router.use("/settings", settingRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/user", userRoutes);

export default router;