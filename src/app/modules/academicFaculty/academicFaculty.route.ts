import { Router } from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import vaildateRequest from '../../middlewares/vaildateReauest';
import { academicFacultyZodVaildation } from './academicFaculty.vaildation';

const router = Router();

router.post(
  '/create-faculty',
  vaildateRequest(academicFacultyZodVaildation.createAcademicFaculty),
  AcademicFacultyController.createFaculty
);
router.get('/:id', AcademicFacultyController.getSingleFaculty);
router.delete('/:id', AcademicFacultyController.deleteFaculty);
router.patch(
  '/:id',
  vaildateRequest(academicFacultyZodVaildation.updateAcademicFaculty),
  AcademicFacultyController.updateFaculty
);
router.get('/', AcademicFacultyController.getAllFaculty);

export const AcademicFacultyRoutes = router;
