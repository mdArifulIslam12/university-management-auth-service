import { NextFunction, Request, Response } from 'express';
import { academicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendRseponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicSemester } from './academicSemester.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../constants/pagination';
import { filterOfFields } from './academicSemester.constant';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemester } = req.body;
    const result = await academicSemesterService.createSemester(
      academicSemester
    );

    sendRseponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Academic Semester is a created Successfully',
    });
    next();
  }
);

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, filterOfFields);

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
    next();
  }
);

const getSignleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await academicSemesterService.getSingleSemester(id);
    sendRseponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Academic Semester is a created Successfully',
    });
    next();
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemester,
  getSignleSemester,
};
