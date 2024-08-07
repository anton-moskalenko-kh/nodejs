import { RoleEnum } from "../enums/role.enum";

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
