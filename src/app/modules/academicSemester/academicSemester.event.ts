import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_SEMESTER_CREATED,
  EVENT_ACADEMIC_SEMESTER_UPDATED,
} from './academicSemester.constant';
import { IAcademicSemesterCreatedEvent } from './academicSemester.interface';
import { academicSemesterService } from './academicSemester.service';

const initAcademicSemesterEvents = async () => {
  await RedisClient.subscribe(
    EVENT_ACADEMIC_SEMESTER_CREATED,
    async (e: string) => {
      const data: IAcademicSemesterCreatedEvent = JSON.parse(e);
      await academicSemesterService.createSemesterFromEvent(data);
    }
  );
  await RedisClient.subscribe(
    EVENT_ACADEMIC_SEMESTER_UPDATED,
    async (e: string) => {
      const data: IAcademicSemesterCreatedEvent = JSON.parse(e);
      await academicSemesterService.updateOneIntoDBFromEvent(data);
    }
  );
};

export default initAcademicSemesterEvents;
