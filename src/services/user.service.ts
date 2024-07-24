import { IUserInterface } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

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
}

export const userService = new UserService();
