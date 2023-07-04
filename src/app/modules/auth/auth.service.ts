import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import {
  IChangePassword,
  ILogin,
  ILoginUserResponse,
  IResponseRefreshToken,
} from './auth.interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelper } from '../../../helpers/jwtHelper';
// import bcrypt from 'bcrypt';

const loginUser = async (payload: ILogin): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  // creating intance of user
  const user = new User();

  // check user
  const isUserExist = await user.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }
  // match password
  const isPasswordMatch =
    isUserExist.password &&
    (await user.isPasswordMatch(password, isUserExist?.password));
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  // access token
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelper.createToken(
    {
      id: userId,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.secret_expires as string
  );
  const refreshToken = jwtHelper.createToken(
    {
      id: userId,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires as string
  );
  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IResponseRefreshToken> => {
  let verifyedToken = null;
  try {
    verifyedToken = jwtHelper.verifyedToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid is refresh token');
  }

  // checking user
  const { id } = verifyedToken;
  const user = new User();
  const isUserExist = await user.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User dose not exist!');
  }
  // generater new token
  const accessToken = jwtHelper.createToken(
    { id: isUserExist?.id, role: isUserExist?.role },
    config.jwt.secret as Secret,
    config.jwt.refresh_expires as string
  );
  return { accessToken };
};

const changePassword = async (
  passwordData: IChangePassword,
  userData: JwtPayload | null
): Promise<void> => {
  const { oldPassword, newPassword } = passwordData;

  const user = new User();

  // check user
  // const isUserExist = await user.isUserExist(userData?.id);

  // aternative way
  const isUserExist = await User.findOne({ id: userData?.id }).select(
    '+password'
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }
  // checking match password
  const isPasswordMatch =
    isUserExist.password &&
    (await user.isPasswordMatch(oldPassword, isUserExist?.password));
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  }
  // bcyrpt hash password
  // const newHashBcrypt = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bcrypt_salt_rounds)
  // );
  // const query = { id: user.id };
  // const updateData = {
  //   password: newHashBcrypt,
  //   needsPasswordChange: false,
  //   passwordChangeAt: new Date(),
  // };
  // await User.findOneAndUpdate(query, updateData);

  // alternative way or other system
  /// update data
  isUserExist.needsPasswordChange = false;
  isUserExist.password = newPassword;

  // update saveing
  isUserExist.save();
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
