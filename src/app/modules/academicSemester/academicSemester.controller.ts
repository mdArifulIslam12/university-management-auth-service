import { Request, Response } from 'express';
import { academicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendRseponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicSemester } from './academicSemester.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { semesterfilterOfFields } from './academicSemester.constant';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemester } = req.body;
    const result = await academicSemesterService.createSemester(
      academicSemester
    );

    sendRseponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is a created Successfully',
      data: result,
    });
  }
);

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, semesterfilterOfFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await academicSemesterService.getAllSemester(
    filters,
    paginationOptions
  );
  sendRseponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Academic Semester',
    meta: result.meta,
    data: result.data,
  });
});

const getSignleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicSemesterService.getSingleSemester(id);
  sendRseponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is a get Successfully',
    data: result,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await academicSemesterService.updateSemester(id, updateData);

  sendRseponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester updated successfully',
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicSemesterService.deleteSemester(id);

  sendRseponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Deleted successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemester,
  getSignleSemester,
  updateSemester,
  deleteSemester,
};
