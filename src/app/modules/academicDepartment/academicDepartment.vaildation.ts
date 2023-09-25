import { z } from 'zod';

const createAcademicDepartmentVaildation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    academicFaculty: z.string({
      required_error: 'Academic Faculty is reuired',
    }),
  }),
});
const updateAcademicDepartmentVaildation = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const acadmicDepartmentZodVaildation = {
  createAcademicDepartmentVaildation,
  updateAcademicDepartmentVaildation,
};
