import { Model } from 'mongoose';

export type IAcademicFaculty = {
  title: string;
};

export type IAcademicFacltyFilters = {
  searchTerm?: string;
};

export type AcademicFacultyModel = Model<IAcademicFaculty, object>;
