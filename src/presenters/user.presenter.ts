import { configs } from "../configs/configs";
import {
  IUserInterface,
  IUserListQuery,
  IUserResponse,
  IUserResponseList,
} from "../interfaces/user.interface";

export class UserPresenter {
  public static toResponse(data: IUserInterface): IUserResponse {
    return {
      _id: data._id,
      name: data.name,
      age: data.age,
      email: data.email,
      avatar: data.avatar
        ? `${configs.AWS_ENDPOINT_URL}/${configs.AWS_BUCKET_NAME}/${data.avatar}`
        : null,
      phone: data.phone,
      role: data.role,
      isVerified: data.isVerified,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public static toResponseList(
    data: IUserInterface[],
    total: number,
    query: IUserListQuery,
  ): IUserResponseList {
    return {
      data: data.map((item) => this.toResponse(item)),
      total,
      ...query,
    };
  }
}
