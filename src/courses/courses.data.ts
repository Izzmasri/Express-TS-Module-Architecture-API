import { faker } from "@faker-js/faker";
import { Course } from "./courses.entity";
import { createRandomCourse } from "../shared/seeds/courses.seed";

export const courseData: Course[] = faker.helpers.multiple(createRandomCourse, {
  count: 5,
});
