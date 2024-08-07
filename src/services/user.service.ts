import { UploadedFile } from "express-fileupload";

import { IUserInterface } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";

class UserService {
  public async getList(): Promise<IUserInterface[]> {
    return await userRepository.getList();
  }

  public async getById(userId: string): Promise<IUserInterface> {
    return await userRepository.getById(userId);
  }

  public async getMe(userId: string): Promise<IUserInterface> {
    return await userRepository.getById(userId);
  }

  public async updateMe(
    userId: string,
    dto: IUserInterface,
  ): Promise<IUserInterface> {
    return await userRepository.updateById(userId, dto);
  }

  public async deleteMe(userId: string): Promise<void> {
    await userRepository.deleteById(userId);
  }

  public async uploadAvatar(
    userId: string,
    file: UploadedFile,
  ): Promise<IUserInterface> {
    const user = await userRepository.getById(userId);
    const avatar = await s3Service.uploadFile("user", userId, file);
    const updatedUser = await userRepository.updateById(userId, { avatar });
    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }
    return updatedUser;
  }

  public async deleteAvatar(userId: string): Promise<IUserInterface> {
    const user = await userRepository.getById(userId);
    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }
    return await userRepository.updateById(userId, { avatar: null });
  }
}

export const userService = new UserService();
