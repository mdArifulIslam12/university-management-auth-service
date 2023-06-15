import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const UserSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    // faculty: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Student',
    // },
    // admin: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'admin',
    // },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// create modeal

export const User = model<IUser, UserModel>('User', UserSchema);
