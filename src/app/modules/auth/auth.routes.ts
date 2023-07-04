import { Router } from 'express';
import vaildateRequest from '../../middlewares/vaildateReauest';
import { AuthZodValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';

const router = Router();

router.post(
  '/login',
  vaildateRequest(AuthZodValidation.createAuthSchema),
  AuthController.createAuth
);
router.post(
  '/refresh-token',
  vaildateRequest(AuthZodValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);
router.patch(
  '/change-password',
  vaildateRequest(AuthZodValidation.changePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  AuthController.changePassword
);

export const AuthRoutes = router;
