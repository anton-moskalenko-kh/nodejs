import { RoleEnum } from "../enums/role.enum";

export interface IUserInterface {
  _id?: number;
  name: string;
  age: number;
  email: string;
  password: string;
  phone?: string;
  role: RoleEnum;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
