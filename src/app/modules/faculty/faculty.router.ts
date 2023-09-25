import { Router } from 'express';
import { FacultyController } from './faculty.controller';
import vaildateRequest from '../../middlewares/vaildateReauest';
import { FacultyZodValidation } from './faculty.validation';

const router = Router();

router.get('/:id', FacultyController.getSingleFaculty);
router.delete('/:id', FacultyController.deleteFaculty);
router.patch(
  '/:id',
  vaildateRequest(FacultyZodValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);
router.get('/', FacultyController.getAllFaculty);

export const FacultyRoutes = router;
