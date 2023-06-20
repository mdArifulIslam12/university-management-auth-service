import { Model } from 'mongoose';

export type IAdmin = {
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
  department: string;
  designation: string;
};
export type IAdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilter = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
