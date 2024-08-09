import { OrderEnum } from "../enums/order.enum";
import { RoleEnum } from "../enums/role.enum";
import { UserListOrderByEnum } from "../enums/user-list-order-by.enum";

export interface IUserInterface {
  _id?: string;
  name: string;
  age: number;
  email: string;
  password: string;
  avatar?: string;
  phone?: string;
  role: RoleEnum;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ILogin extends Pick<IUserInterface, "email" | "password"> {}

export interface IUserListQuery {
  limit?: number;
  page?: number;
  search?: string;
  order?: OrderEnum;
  orderBy?: UserListOrderByEnum;
}

export interface IUserResponse
  extends Pick<
    IUserInterface,
    | "_id"
    | "name"
    | "age"
    | "email"
    | "avatar"
    | "phone"
    | "role"
    | "isVerified"
    | "createdAt"
    | "updatedAt"
  > {}

export interface IUserResponseList extends IUserListQuery {
  data: IUserResponse[];
  total: number;
}
