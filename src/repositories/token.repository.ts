import { FilterQuery } from "mongoose";

import { ITokenInterface } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
  public async create(dto: ITokenInterface): Promise<ITokenInterface> {
    return await Token.create(dto);
  }

  public async findByParams(
    params: FilterQuery<ITokenInterface>,
  ): Promise<ITokenInterface> {
    return await Token.findOne(params);
  }

  public async deleteById(id: string): Promise<void> {
    await Token.deleteOne({ _id: id });
  }

  public async deleteByParams(
    params: FilterQuery<ITokenInterface>,
  ): Promise<void> {
    await Token.deleteMany(params);
  }
}

export const tokenRepository = new TokenRepository();
