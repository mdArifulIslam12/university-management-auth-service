import { z } from 'zod';

const createAcademicFaculty = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Academic faculty title required',
    }),
  }),
});
const updateAcademicFaculty = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Academic faculty title required',
    }),
  }),
});

export const academicFacultyZodVaildation = {
  createAcademicFaculty,
  updateAcademicFaculty,
};
