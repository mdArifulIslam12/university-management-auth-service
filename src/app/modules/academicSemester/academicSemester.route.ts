import { Router } from 'express';
import vaildateRequest from '../../middlewares/vaildateReauest';
import { acaddemicSemesterValidation } from './academicSemester.vaildation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = Router();

router.post(
  '/create-semester',
  vaildateRequest(acaddemicSemesterValidation.academicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester
);

router.get('/:id', AcademicSemesterController.getSignleSemester);
router.patch(
  '/:id',
  vaildateRequest(acaddemicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
);
router.delete('/:id', AcademicSemesterController.deleteSemester);
router.get('/', AcademicSemesterController.getAllSemester);

export const AcademicSemesterRoutes = router;
