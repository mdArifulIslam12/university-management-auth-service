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

router.get('/', AcademicSemesterController.getAllSemester);

router.get('/:id', AcademicSemesterController.getSignleSemester);

export const AcademicSemesterRoutes = router;
