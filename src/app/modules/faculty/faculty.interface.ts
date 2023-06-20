import { Model, Types } from 'mongoose';

export type IFaculty = {
  id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  designation: string;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
};
export type IFacultyModel = Model<IFaculty, Record<string, unknown>>;

export type IFacultyFilter = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
