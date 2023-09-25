import { Router } from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import vaildateRequest from '../../middlewares/vaildateReauest';
import { acadmicDepartmentZodVaildation } from './academicDepartment.vaildation';

const router = Router();

router.post(
  '/create-department',
  vaildateRequest(
    acadmicDepartmentZodVaildation.createAcademicDepartmentVaildation
  ),
  AcademicDepartmentController.createDepartment
);
router.get('/:id', AcademicDepartmentController.getSingleDepartment);
router.delete('/:id', AcademicDepartmentController.deleteDepartment);
router.patch(
  '/:id',
  vaildateRequest(
    acadmicDepartmentZodVaildation.updateAcademicDepartmentVaildation
  ),
  AcademicDepartmentController.updateDepartment
);
router.get('/', AcademicDepartmentController.getAllDepartment);

export const AcademicDepartmentRoute = router;
