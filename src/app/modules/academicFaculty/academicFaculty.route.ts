import { Router } from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import vaildateRequest from '../../middlewares/vaildateReauest';
import { academicFacultyZodVaildation } from './academicFaculty.vaildation';
import { ENUM_USER_ROLE } from '../../enums/user';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/create-faculty',
  vaildateRequest(academicFacultyZodVaildation.createAcademicFaculty),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.createFaculty
);
router.patch(
  '/:id',
  vaildateRequest(academicFacultyZodVaildation.updateAcademicFaculty),
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  AcademicFacultyController.updateFaculty
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  AcademicFacultyController.getSingleFaculty
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicFacultyController.deleteFaculty
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  AcademicFacultyController.getAllFaculty
);

export const AcademicFacultyRoutes = router;
