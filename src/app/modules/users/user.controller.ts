import { Request, Response } from 'express';
import { UserService } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import sendRseponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const result = await UserService.createStudent(student, userData);

  sendRseponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'User created Successfully',
  });
});

export const UserController = {
  createStudent,
};
