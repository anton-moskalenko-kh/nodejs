import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth middlewares";
import { commonMiddleware } from "../middlewares/common middlewares";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getList);

router.get("/:me", authMiddleware.checkAccessToken, userController.getMe);
router.put(
  "/me",
  authMiddleware.checkAccessToken,
  commonMiddleware.isValidBody(UserValidator.updateUser),
  userController.updateMe,
);
router.delete("/me", authMiddleware.checkAccessToken, userController.deleteMe);

router.get(
  "/:userId",
  commonMiddleware.isValidId("userId"),
  userController.getById,
);

export const userRouter = router;
