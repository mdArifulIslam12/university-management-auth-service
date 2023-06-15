import { z } from 'zod';
import { studentBloodGroup, studentGender } from '../student/student.constant';
const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'Frist Name is required' }),
        middleName: z
          .string({ required_error: 'Middle Name is required' })
          .optional(),
        lastName: z.string({ required_error: 'Frist Name is required' }),
      }),
      dateOfBirth: z.string({ required_error: 'Date Of Birth is required' }),
      gender: z.enum([...studentGender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z
        .enum([...studentBloodGroup] as [string, ...string[]], {
          required_error: 'Blood group is required',
        })
        .optional(),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'ContactNo is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'EmergencyContactNo is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      guardian: z.object({
        fatherName: z.string({ required_error: 'Father name is required' }),
        fatherOccupation: z.string({
          required_error: 'Father occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contactNo is required',
        }),
        motherName: z.string({ required_error: 'Mother name is required' }),
        motherOccupation: z.string({
          required_error: 'Mother occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contactNo is required',
        }),
        address: z.string({ required_error: 'Address is required' }),
      }),
      localGuardian: z.object({
        name: z.string({ required_error: 'Name is required' }),
        occupation: z.string({ required_error: 'Occupation is required' }),
        contactNo: z.string({ required_error: 'ContactNO is required' }),
        address: z.string({ required_error: 'Address is required' }),
      }),
      profileImage: z
        .string({ required_error: 'ProfileImage is required' })
        .optional(),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is required',
      }),
      academicSemester: z.string({
        required_error: 'Academic semester is required',
      }),
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
