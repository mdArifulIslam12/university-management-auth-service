import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interface/pagination';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
import { academicDepartmentSearchableFields } from './academicDepartment.constant';

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );
  return result;
};
const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};
const updateDepartment = async (
  id: string,
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate('academicFaculty');
  return result;
};

const getAllDepartment = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions
) => {
  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortCondiation: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondiation[sortBy] = sortOrder;
  }
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchableFields.map(field => ({
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
  const whereCondition = andConditions.length ? { $and: andConditions } : {};
  const result = await AcademicDepartment.find(whereCondition)
    .sort(sortCondiation)
    .skip(skip)
    .limit(limit)
    .populate('academicFaculty');
  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicDepartmentService = {
  createDepartment,
  getSingleDepartment,
  deleteDepartment,
  updateDepartment,
  getAllDepartment,
};
