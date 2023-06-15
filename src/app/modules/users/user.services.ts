import config from '../../../config/index';
import { IUser } from './user.interface';
import { User } from './user.model';
import ApiError from '../../../errors/ApiError';
import { generateStudentId } from './user.utils';
import { IStudent } from '../student/student.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

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

export const UserService = {
  createStudent,
};
