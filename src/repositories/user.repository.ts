import { FilterQuery, SortOrder } from "mongoose";

import { UserListOrderByEnum } from "../enums/user-list-order-by.enum";
import { IUserInterface, IUserListQuery } from "../interfaces/user.interface";
import { Token } from "../models/token.model";
import { UserModel } from "../models/user.model";

class UserRepository {
  public async getByParams(
    params: Partial<IUserInterface>,
  ): Promise<IUserInterface> {
    return await UserModel.findOne(params);
  }

  public async getList(
    query: IUserListQuery,
  ): Promise<[IUserInterface[], number]> {
    const filterObj: FilterQuery<IUserInterface> = { isVerified: true };
    if (query.search) {
      filterObj.$or = [
        { name: { $regex: query.search, $options: "i" } },
        { email: { $regex: query.search, $options: "i" } },
      ];
    }
    const sortObj: { [key: string]: SortOrder } = {};
    switch (query.orderBy) {
      case UserListOrderByEnum.NAME:
        sortObj.name = query.order;
        break;
      case UserListOrderByEnum.AGE:
        sortObj.age = query.order;
        break;
      default:
        throw new Error("Invalid orderBy");
    }
    const skip = (query.page - 1) * query.limit;
    return await Promise.all([
      UserModel.find(filterObj).sort(sortObj).limit(query.limit).skip(skip),
      UserModel.countDocuments(filterObj),
    ]);
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
