import config from '../../../config/index';
import { IUser } from './user.interface';
import { User } from './user.model';
import ApiError from '../../../errors/ApiError';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { IStudent } from '../student/student.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  //default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  // role
  user.role = 'student';
  // get academicSemester
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    /// generate student id
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    // new student
    const createStudent = await Student.create([student], { session });
    if (!createStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    // set student _id add to user
    user.student = createStudent[0]?._id;

    // new user
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicSemester',
        },
      ],
    });
  }
  return newUserAllData;
};

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  //default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }
  // role
  user.role = 'faculty';
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate faculty id
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    const facultyResult = await Faculty.create([faculty], { session });
    if (!facultyResult.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    user.faculty = facultyResult[0]?._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create user faculty'
      );
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }
  return newUserAllData;
};
const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  //default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }
  // role
  user.role = 'admin';
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate faculty id
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    const adminResult = await Admin.create([admin], { session });
    if (!adminResult.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    user.admin = adminResult[0]?._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create user faculty'
      );
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id });
  }
  return newUserAllData;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
