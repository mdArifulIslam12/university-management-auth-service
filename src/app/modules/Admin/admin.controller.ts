import httpStatus from 'http-status';
import sendRseponse from '../../../shared/sendResponse';
import { IAdmin } from './admin.interface';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { adminFilterFields } from './admin.constant';
import { AdminService } from './admin.service';

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AdminService.getAllAdmin(filters, paginationOptions);
  sendRseponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.getSingleAdmin(id);
  sendRseponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is a get Successfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await AdminService.updateAdmin(id, updateData);

  sendRseponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.deleteAdmin(id);

  sendRseponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Deleted successfully',
    data: result,
  });
});

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
