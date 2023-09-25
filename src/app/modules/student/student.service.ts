/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPaginationOptions } from '../../../interface/pagination';
import { IGenricResponse } from '../../../interface/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import mongoose, { SortOrder } from 'mongoose';
import { studentSearchableFields } from './student.constant';
import { IStudent, IStudentFilter } from './student.interface';
import { Student } from './student.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { User } from '../users/user.model';

const getAllStudent = async (
  filters: IStudentFilter,
  paginationOption: IPaginationOptions
): Promise<IGenricResponse<IStudent[]>> => {
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
      $or: studentSearchableFields.map(field => ({
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
  //   {
  //     $or: [
  //       {
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
  const result = await Student.find(whereCondition)
    .sort(sortCondiation)
    .skip(skip)
    .limit(limit)
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester');

  const total = await Student.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester');
  return result;
};

const updateStudent = async (id: string, payload: Partial<IStudent>) => {
  const isExist = await Student.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found!');
  }
  const { name, guardian, localGuardian, ...student } = payload;
  const updateStudentData: Partial<IStudent> = { ...student };

  // dynamically handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const keyName = `name.${key}`;
      (updateStudentData as any)[keyName] = name[key as keyof typeof name];
    });
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const keyguardian = `guardian.${key}`;
      (updateStudentData as any)[keyguardian] =
        guardian[key as keyof typeof guardian];
    });
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const keylocalGuardian = `localGuardian.${key}`;
      (updateStudentData as any)[keylocalGuardian] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }
  const result = await Student.findOneAndUpdate({ id }, updateStudentData, {
    new: true,
  });
  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student is not found!');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const student = await Student.findOneAndDelete({ id }, { session });
    if (!student) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Student is do not delete successfully!'
      );
    }
    await User.deleteOne({ id });
    await session.commitTransaction();
    await session.endSession();
    return student;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const StudentServeice = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
