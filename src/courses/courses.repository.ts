// import { BaseRepository } from "../shared/utils/base.repository";
// import { courseData } from "./courses.data";
// import { Course } from "./courses.entity";

// type CreateCoursePayload = Omit<Course, "id" | "createdAt" | "updatedAt">;
// type UpdateCoursePayload = Partial<Omit<Course, "id" | "createdAt">>;

// export class CourseRepository extends BaseRepository<
//   Course,
//   CreateCoursePayload,
//   UpdateCoursePayload
// > {
//   constructor() {
//     super(courseData);
//   }
// }

// ---------------------------------

// using prisma

import { PrismaClient, Course } from "../generated/prisma";
import { BaseRepository } from "../shared/utils/base.repository";

const prisma = new PrismaClient();

type CreateCoursePayload = Omit<Course, "id" | "createdAt" | "updatedAt">;
type UpdateCoursePayload = Partial<Omit<Course, "id" | "createdAt">>;

export class CourseRepository extends BaseRepository<
  Course,
  CreateCoursePayload,
  UpdateCoursePayload
> {
  constructor() {
    super(prisma.course, prisma);
  }
}
