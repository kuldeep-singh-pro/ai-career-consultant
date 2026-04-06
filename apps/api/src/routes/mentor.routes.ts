import { Router } from "express";
import protect from "../middleware/auth.middleware";
import {
  sendMessageController,
  getChatHistoryController,
  getChatSessionsController,
  clearChatHistoryController,
  getChatContextController,
} from "../controller/mentor.controller";
import { validate } from "../middleware/validate.middleware";
import { SendMessageRequestDto, ClearChatRequestDto } from "../dto/mentor.dto";

const router: Router = Router();

router.post(
  "/send",
  protect,
  validate(SendMessageRequestDto),
  sendMessageController
);

router.get("/history", protect, getChatHistoryController);

router.get("/sessions", protect, getChatSessionsController);

router.get("/context", protect, getChatContextController);

router.delete(
  "/clear",
  protect,
  validate(ClearChatRequestDto),
  clearChatHistoryController
);

export default router;
