import { Router } from "express";
import authRoutes from "./auth.routes";
import resumeRoutes from "./resume.routes";
import skillgapRoutes from "./skillgap.routes";

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

export default router;