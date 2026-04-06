import { Router } from "express";
import protect from "../middleware/auth.middleware";
import {
  getSettingsController,
  updateSettingsController,
  resetSettingsController,
  getSettingsSummaryController,
  deleteSettingsController,
} from "../controller/setting.controller";
import { validate } from "../middleware/validate.middleware";
import { UpdateSettingsRequestDto, ResetSettingsRequestDto } from "../dto/setting.dto";

const router: Router = Router();

router.get("/", protect, getSettingsController);

router.get("/summary", protect, getSettingsSummaryController);

router.patch(
  "/",
  protect,
  validate(UpdateSettingsRequestDto),
  updateSettingsController
);

router.post(
  "/reset",
  protect,
  validate(ResetSettingsRequestDto),
  resetSettingsController
);

router.delete("/", protect, deleteSettingsController);

export default router;
