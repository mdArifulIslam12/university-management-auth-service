import { Request, Response } from 'express';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendRseponse from '../../../shared/sendResponse';
import { IFaculty } from './faculty.interface';
import httpStatus from 'http-status';
import { FacultyService } from './faculty.service';
import { facultyFilterFields } from './faculty.constant';

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await FacultyService.getAllFaculty(filters, paginationOptions);
  sendRseponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.getSingleFaculty(id);
  sendRseponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is a get Successfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await FacultyService.updateFaculty(id, updateData);

  sendRseponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.deleteFaculty(id);

  sendRseponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Deleted successfully',
    data: result,
  });
});

export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
