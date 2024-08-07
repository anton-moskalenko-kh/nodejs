import { configs } from "../configs/configs";
import { IUserInterface } from "../interfaces/user.interface";

export class UserPresenter {
  public static toResponse(data: IUserInterface) {
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
}
