import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common middlewares";

const router = Router();

router.get("/", userController.getList);
router.post("/", userController.create);

router.get(
  "/:userId",
  commonMiddleware.isValidId("userId"),
  userController.getById,
);
router.put(
  "/:userId",
  commonMiddleware.isValidId("userId"),
  userController.updateById,
);
router.delete(
  "/:userId",
  commonMiddleware.isValidId("userId"),
  userController.deleteById,
);

export const userRouter = router;
