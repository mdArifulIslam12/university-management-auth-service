import { z } from 'zod';
import { studentBloodGroup, studentGender } from '../student/student.constant';

const updateFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z
        .object({
          firstName: z.string().optional(),
          middleName: z.string().optional(),
          lastName: z.string().optional(),
        })
        .optional(),
      dateOfBirth: z.string().optional(),
      gender: z.enum([...studentGender] as [string, ...string[]]).optional(),
      bloodGroup: z
        .enum([...studentBloodGroup] as [string, ...string[]])
        .optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      designation: z.string().optional(),
      academicFaculty: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const FacultyZodValidation = {
  updateFacultyZodSchema,
};
