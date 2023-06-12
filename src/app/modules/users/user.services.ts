import config from '../../../config/index';
import { generateUserId } from './user.utils';
import { IUser } from './user.interface';
import { User } from './user.model';
import ApiError from '../../../errors/ApiError';

const createUser = async (user: IUser): Promise<IUser | null> => {
  /// auto generated incremental id
  const id = await generateUserId();
  user.id = id as string;
  //default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  const createUsers = await User.create(user);
  if (!createUser) {
    throw new ApiError(400, 'Failed to create user');
  }
  return createUsers;
};

export const UserService = {
  createUser,
};
