import { z } from 'zod';
import { studentGender } from '../student/student.constant';

const updateAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z
        .object({
          firstName: z.string().optional(),
          middleName: z.string().optional(),
          lastName: z.string().optional(),
        })
        .optional(),
      dateOfBirth: z.string().optional(),
      gender: z.enum([...studentGender] as [string, ...string[]]).optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      designation: z.string().optional(),
      department: z.string().optional(),
    }),
  }),
});

export const AdminValidationZod = {
  updateAdminZodSchema,
};
