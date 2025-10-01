import { BaseRepository } from "../shared/utils/base.repository";
import { Course } from "./courses.entity";
import { CourseModel } from "./courses.model";

type CreateCoursePayload = Omit<Course, "id" | "createdAt" | "updatedAt">;
type UpdateCoursePayload = Partial<Omit<Course, "id" | "createdAt">>;

export class CourseRepository extends BaseRepository<
  Course,
  CreateCoursePayload,
  UpdateCoursePayload
> {
  constructor() {
    super(CourseModel);
  }
}
