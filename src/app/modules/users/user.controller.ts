import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import sendRseponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserService.createUser(user);

    sendRseponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'User created Successfully',
    });
    next();
  }
);

export const UserController = {
  createUser,
};
