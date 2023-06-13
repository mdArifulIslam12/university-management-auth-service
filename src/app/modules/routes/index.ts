import { Router } from 'express';
import { UserRoutes } from '../users/user.router';
import { AcademicSemesterRoutes } from '../academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../academicFaculty/academicFaculty.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
