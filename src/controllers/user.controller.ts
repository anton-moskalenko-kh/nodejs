import { NextFunction, Request, Response } from "express";

import { IUserInterface } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const result = await userService.getById(userId);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.res.locals.jwtPayload.userId as string;
      const result = await userService.getMe(userId);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.res.locals.jwtPayload.userId as string;
      const dto = req.body as IUserInterface;
      const result = await userService.updateMe(userId, dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.res.locals.jwtPayload.userId as string;
      await userService.deleteMe(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
