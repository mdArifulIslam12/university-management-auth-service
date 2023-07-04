/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// intancts methods
UserSchema.methods.isUserExist = async function (
  id: string
): Promise<Partial<IUser> | null> {
  const userExist = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1, role: 1 }
  );

  return userExist;
};

UserSchema.methods.isPasswordMatch = async function (
  givenPassword: string,
  savedPasswrd: string
): Promise<boolean> {
  const isPassword = await bcrypt.compare(givenPassword, savedPasswrd);

  return isPassword;
};

// static user

// UserSchema.statics.isUserExist = async function (
//   id: string
// ): Promise<Pick<IUser, 'id' | 'password' | 'needsPasswordChange'> | null> {
//   const userExist = await User.findOne(
//     { id },
//     { id: 1, password: 1, needsPasswordChange: 1 }
//   );

//   return userExist;
// };
// UserSchema.statics.isPasswordMatch = async function (
//   givenPassword: string,
//   savedPasswrd: string
// ): Promise<boolean> {
//   const isPassword = await bcrypt.compare(givenPassword, savedPasswrd);
//   return isPassword;
// };

UserSchema.pre('save', async function (next) {
  // hash password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  if (!user.needsPasswordChange) {
    user.passwordChangeAt = new Date();
  }

  next();
});

// create modeal

export const User = model<IUser, UserModel>('User', UserSchema);
