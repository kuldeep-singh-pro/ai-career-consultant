import { Router } from "express";
import { aiChatController } from "../controllers/ai.controller";
import { validate } from "../middleware/validate.middleware";
import { aiSchema } from "../validators/ai.validator";
import { aiGuard } from "../middleware/aiGuard.middleware";

const router = Router();

router.post("/chat", validate(aiSchema), aiGuard, aiChatController);

export default router;
