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

export const UserRoutes = router;
