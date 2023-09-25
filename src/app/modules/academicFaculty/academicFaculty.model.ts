import { Schema, model } from 'mongoose';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.interface';

const academicFacultySchema = new Schema<
  IAcademicFaculty,
  AcademicSemesterModel
>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AcademicFaculty = model<IAcademicFaculty, AcademicSemesterModel>(
  'AcademicFaculty',
  academicFacultySchema
);
