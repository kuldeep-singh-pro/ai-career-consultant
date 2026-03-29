import { Router } from "express";
import authRoutes from "./auth.routes";
import resumeRoutes from "./resume.routes";

const router: Router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "API running",
  });
});

router.use("/auth", authRoutes);
router.use("/resume", resumeRoutes);

export default router;