import { IUserInterface } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";

class UserRepository {
  public async getList(): Promise<IUserInterface[]> {
    return await UserModel.find();
  }

  public async create(dto: IUserInterface): Promise<IUserInterface> {
    return await UserModel.create(dto);
  }

  public async getById(userId: string): Promise<IUserInterface> {
    return await UserModel.findById(userId);
  }

  public async updateById(
    userId: string,
    dto: IUserInterface,
  ): Promise<IUserInterface> {
    return await UserModel.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
  }

  public async deleteById(userId: string): Promise<void> {
    await UserModel.deleteOne({ _id: userId });
  }
}

export const userRepository = new UserRepository();
