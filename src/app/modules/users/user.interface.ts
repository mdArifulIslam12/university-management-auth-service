/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../Admin/admin.interface';

export type IUser = {
  id: string;
  password: string;
  role: string;
  needsPasswordChange: true | false;
  passwordChangeAt?: Date;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};
// instantce
export type IUserMethods = {
  isUserExist(id: string): Promise<Partial<IUser> | null>;
  isPasswordMatch(
    givenPassword: string,
    savedPasswrd: string
  ): Promise<boolean>;
};
// static methods
// export type UserModel = {
//   isUserExist(
//     id: string
//   ): Promise<Pick<IUser, 'id' | 'password' | 'needsPasswordChange'>>;
//   isPasswordMatch(
//     givenPassword: string,
//     savedPasswrd: string
//   ): Promise<boolean>;
// } & Model<IUser>;

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
