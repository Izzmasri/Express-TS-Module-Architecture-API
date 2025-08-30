import { BaseRepository } from "../shared/utils/base.repository";
import { Course } from "./courses.entity";
import { v4 as uuid } from "uuid";

const courses: Course[] = [
  {
    id: uuid(),
    title: "Introduction to Web Development",
    description:
      "Learn the basics of HTML, CSS, and JavaScript to build your first web pages.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuid(),
    title: "Data Structures & Algorithms",
    description:
      "Master core data structures and algorithms to improve problem-solving and coding skills.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuid(),
    title: "Machine Learning Fundamentals",
    description:
      "Understand the principles of machine learning and build your first predictive models.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

type CreateCoursePayload = Omit<Course, "id" | "createdAt" | "updatedAt">;
type UpdateCoursePayload = Partial<Omit<Course, "id" | "createdAt">>;

export class CourseRepository extends BaseRepository<
  Course,
  CreateCoursePayload,
  UpdateCoursePayload
> {
  constructor() {
    super(courses);
  }
}
