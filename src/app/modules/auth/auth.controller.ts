import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendRseponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { ILoginUserResponse, IResponseRefreshToken } from './auth.interface';
import config from '../../../config';

const createAuth = catchAsync(async (req: Request, res: Response) => {
  const { ...authData } = req.body;
  const result = await AuthService.loginUser(authData);
  const { refreshToken, ...others } = result;

  const options = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, options);

  // sytemn is delete

  // delete result.refreshToke;
  // if ('refreshToken' in result) {
  //   delete result.refreshToken;
  // }
  sendRseponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is successfully login',
    data: others,
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  const options = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, options);

  sendRseponse<IResponseRefreshToken>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh token is successfully',
    data: result,
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...passwordData } = req.body;

  const result = await AuthService.changePassword(passwordData, user);

  sendRseponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password change is successfully',
    data: result,
  });
});

export const AuthController = {
  createAuth,
  refreshToken,
  changePassword,
};
