import { Router } from 'express';
import { StudentController } from './student.controller';
import vaildateRequest from '../../middlewares/vaildateReauest';
import { StudentValidation } from './student.validation';

const router = Router();

router.get('/:id', StudentController.getSingleStudent);
router.delete('/:id', StudentController.deleteStudent);
router.patch(
  '/:id',
  vaildateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);
router.get('/', StudentController.getAllStudent);

export const StudentRoutes = router;
