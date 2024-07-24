import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth middlewares";
import { commonMiddleware } from "../middlewares/common middlewares";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleware.isValidBody(UserValidator.createUser),
  authController.signUp,
);

router.post(
  "/sign-in",
  commonMiddleware.isValidBody(UserValidator.login),
  authController.signIn,
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

export const authRouter = router;
