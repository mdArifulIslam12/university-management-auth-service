import { Request, Response } from 'express';

import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IStudent } from './student.interface';
import httpStatus from 'http-status';
import sendRseponse from '../../../shared/sendResponse';
import { studentFilterFields } from './student.constant';
import { StudentServeice } from './student.service';

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await StudentServeice.getAllStudent(
    filters,
    paginationOptions
  );
  sendRseponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentServeice.getSingleStudent(id);
  sendRseponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is a get Successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await StudentServeice.updateStudent(id, updateData);

  sendRseponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentServeice.deleteStudent(id);

  sendRseponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Deleted successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
