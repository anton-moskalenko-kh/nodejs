import { IUserInterface } from "../interfaces/user.interface";
import { Token } from "../models/token.model";
import { UserModel } from "../models/user.model";

class UserRepository {
  public async getByParams(
    params: Partial<IUserInterface>,
  ): Promise<IUserInterface> {
    return await UserModel.findOne(params);
  }

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
    dto: Partial<IUserInterface>,
  ): Promise<IUserInterface> {
    return await UserModel.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
  }

  public async findWithOutActivityAfter(date: Date): Promise<IUserInterface[]> {
    return await UserModel.aggregate([
      {
        $lookup: {
          from: Token.collection.name,
          let: { userId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
            { $match: { createdAt: { $gt: date } } },
          ],
          as: "tokens",
        },
      },
      {
        $match: { tokens: { $size: 0 } },
      },
      // {
      //   $project: {
      //     _id: 1,
      //     email: 1,
      //     name: 1,
      //   },
      // },
    ]);
  }

  public async deleteById(userId: string): Promise<void> {
    await UserModel.deleteOne({ _id: userId });
  }
}

export const userRepository = new UserRepository();
