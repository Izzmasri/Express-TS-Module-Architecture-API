import { CourseRepository } from "./courses.repository";
import { Course } from "./courses.entity";

export class CourseService {
  private repository = new CourseRepository();

  getCourses(): Course[] {
    return this.repository.findAll();
  }

  getCourse(id: string): Course | undefined {
    return this.repository.findById(id);
  }

  createCourse(title: string, description: string, image?: string): Course {
    return this.repository.create({ title, description, image });
  }

  updateCourse(
    id: string,
    title?: string,
    description?: string,
    image?: string
  ): Course | null {
    const updates: Partial<Omit<Course, "id" | "createdAt">> = {};

    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (image !== undefined) updates.image = image;

    return this.repository.update(id, updates);
  }

  deleteCourse(id: string): boolean {
    return this.repository.delete(id);
  }
}
