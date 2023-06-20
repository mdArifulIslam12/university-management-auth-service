import { Router } from 'express';
import vaildateRequest from '../../middlewares/vaildateReauest';
import { AdminController } from './admin.controller';
import { AdminValidationZod } from './admin.validation';

const router = Router();

router.get('/:id', AdminController.getSingleAdmin);
router.delete('/:id', AdminController.deleteAdmin);
router.patch(
  '/:id',
  vaildateRequest(AdminValidationZod.updateAdminZodSchema),
  AdminController.updateAdmin
);
router.get('/', AdminController.getAllAdmin);

export const AdminRoutes = router;
