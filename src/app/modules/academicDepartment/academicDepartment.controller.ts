import httpStatus from 'http-status';
import { IAcademicDepartment } from './academicDepartment.interface';
import sendRseponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { AcademicDepartmentService } from './academicDepartment.service';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body;
  const result = await AcademicDepartmentService.createDepartment(
    academicDepartmentData
  );
  sendRseponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.getSingleDepartment(id);
  sendRseponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic get Single Department successfully',
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.deleteDepartment(id);
  sendRseponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Delete successfully',
    data: result,
  });
});
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateDepartmentData = req.body;
  const result = await AcademicDepartmentService.updateDepartment(
    id,
    updateDepartmentData
  );

  sendRseponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department update successfully',
    data: result,
  });
});

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);

  const paginations = pick(req.query, paginationFields);

  const result = await AcademicDepartmentService.getAllDepartment(
    filters,
    paginations
  );

  sendRseponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty get all successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getSingleDepartment,
  deleteDepartment,
  updateDepartment,
  getAllDepartment,
};
