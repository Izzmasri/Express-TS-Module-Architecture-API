import { faker } from "@faker-js/faker";
import { Course } from "../../courses/courses.entity";

export function createRandomCourse() {
  const randomCourse: Course = {
    id: faker.string.uuid(),
    title: faker.string.alpha({ length: { min: 3, max: 100 } }),
    description: faker.string.alphanumeric({ length: { min: 10, max: 500 } }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.anytime(),
  };
  return randomCourse;
}
