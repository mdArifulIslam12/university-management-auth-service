/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPaginationOptions } from '../../../interface/pagination';
import { IGenricResponse } from '../../../interface/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IFaculty, IFacultyFilter } from './faculty.interface';
import { Faculty } from './faculty.model';
import { facultySearchableFields } from './faculty.constant';

const getAllFaculty = async (
  filters: IFacultyFilter,
  paginationOption: IPaginationOptions
): Promise<IGenricResponse<IFaculty[]>> => {
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
      $or: facultySearchableFields.map(field => ({
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
  const result = await Faculty.find(whereCondition)
    .sort(sortCondiation)
    .skip(skip)
    .limit(limit)
    .populate('academicFaculty')
    .populate('academicDepartment');

  const total = await Faculty.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)
    .populate('academicFaculty')
    .populate('academicDepartment');
  return result;
};

const updateFaculty = async (id: string, payload: Partial<IFaculty>) => {
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'fculty not found!');
  }
  const { name, ...fculty } = payload;
  const updateFacultyData: Partial<IFaculty> = { ...fculty };

  // dynamically handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const keyName = `name.${key}`;
      (updateFacultyData as any)[keyName] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updateFacultyData, {
    new: true,
  });
  return result;
};

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findByIdAndDelete(id)
    .populate('academicFaculty')
    .populate('academicDepartment');
  return result;
};

export const FacultyService = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
