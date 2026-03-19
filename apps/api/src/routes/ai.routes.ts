import { Router } from "express";
import { askCareer } from "../controllers/ai.controller";

const router = Router();

router.post("/career", askCareer);

export default router;