/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPaginationOptions } from '../../../interface/pagination';
import { IGenricResponse } from '../../../interface/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IAdmin, IAdminFilter } from './admin.interface';
import { Admin } from './admin.model';
import { adminSearchableFields } from './admin.constant';
import { User } from '../users/user.model';

const getAllAdmin = async (
  filters: IAdminFilter,
  paginationOption: IPaginationOptions
): Promise<IGenricResponse<IAdmin[]>> => {
  // pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);
  const sortCondiation: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondiation[sortBy] = sortOrder;
  }
  // search
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  const whereCondition = andConditions.length ? { $and: andConditions } : {};
  const result = await Admin.find(whereCondition)
    .sort(sortCondiation)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id);
  return result;
};

const updateAdmin = async (id: string, payload: Partial<IAdmin>) => {
  const isExist = await Admin.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'admin not found!');
  }
  const { name, ...admin } = payload;
  const updateAdminData: Partial<IAdmin> = { ...admin };

  // dynamically handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const keyName = `name.${key}`;
      (updateAdminData as any)[keyName] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ id }, updateAdminData, {
    new: true,
  });
  return result;
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Admin is not found!');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const admin = await Admin.findOneAndDelete({ id }, { session });
    if (!admin) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Admin is do not delete successfully!'
      );
    }
    await User.deleteOne({ id });
    await session.commitTransaction();
    await session.endSession();
    return admin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const AdminService = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
