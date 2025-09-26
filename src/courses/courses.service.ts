import { CourseRepository } from "./courses.repository";
import { Course } from "../generated/prisma";

export class CourseService {
  private repository = new CourseRepository();

  getCourses(): Promise<Course[]> {
    return this.repository.findAll();
  }

  getCourse(id: string): Promise<Course | undefined> {
    return this.repository.findById(id);
  }

  createCourse(
    title: string,
    description: string,
    image: string | null
  ): Promise<Course> {
    return this.repository.create({ title, description, image });
  }

  updateCourse(
    id: string,
    title?: string,
    description?: string,
    image?: string
  ): Promise<Course | null> {
    const updates: Partial<Omit<Course, "id" | "createdAt">> = {};

    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (image !== undefined) updates.image = image;

    return this.repository.update(id, updates);
  }

  deleteCourse(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
