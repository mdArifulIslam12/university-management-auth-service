import { Router } from 'express';
import { UserController } from './user.controller';
import vaildateRequest from '../../middlewares/vaildateReauest';
import { UserValidation } from './user.validation';

const router = Router();

router.post(
  '/create-student',
  vaildateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);
router.post(
  '/create-faculty',
  vaildateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculty
);
router.post(
  '/create-admin',
  vaildateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
);

export const UserRoutes = router;
