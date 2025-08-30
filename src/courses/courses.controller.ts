// import { CourseService } from "./courses.service";
// import { Request, Response } from "express";
// import { CreateCourseDTO, UpdateCourseDTO } from "./util/courses.dto";

// export class CourseController {
//   private service = new CourseService();

//   getCourses = (req: Request, res: Response) => {
//     const courses = this.service.getCourses();
//     res.status(200).json({
//       message: "success",
//       resaults: courses.length,
//       data: courses,
//     });
//   };

//   getCourse = (req: Request<{ id: string }>, res: Response) => {
//     const id = req.params.id;
//     if (!id) return res.status(404).json({ error: "ID required" });

//     const course = this.service.getCourse(id);
//     if (!course) return res.status(404).json({ error: "Course not found" });

//     res.status(200).json({ message: "success", data: course });
//   };

//   createCourse = (req: Request<{}, {}, CreateCourseDTO>, res: Response) => {
//     try {
//       const { title, description } = req.body;
//       const image = req.file
//         ? `../shared/uploads/${req.file.filename}`
//         : undefined;

//       const course = this.service.createCourse(title, description, image);
//       res.status(201).json({ message: "success", data: course });
//     } catch (error) {
//       res.status(500).json({ message: "Error creating course", error });
//     }
//   };

//   updateCourse = (
//     req: Request<{ id: string }, {}, UpdateCourseDTO>,
//     res: Response
//   ) => {
//     const id = req.params.id;
//     if (!id) return res.status(404).json({ error: "ID required" });

//     const { title, description } = req.body;
//     const image = req.file
//       ? `./shared/uploads/${req.file.filename}`
//       : req.body.image;
//     const course = this.service.updateCourse(id, title, description, image);

//     if (!course) return res.status(404).json({ error: "Course not found" });

//     res.status(200).json({ message: "success", data: course });
//   };

//   deleteCourse = (req: Request<{ id: string }>, res: Response) => {
//     const id = req.params.id;
//     if (!id) return res.status(404).json({ error: "ID required" });
//     const course = this.service.deleteCourse(id);
//     res.status(200).json({
//       message: "success",
//     });
//   };
// }

import { Request, Response } from "express";
import { CourseService } from "./courses.service";
import { CreateCourseDTO, UpdateCourseDTO } from "./util/courses.dto";
import { HttpErrorStatus } from "../shared/utils/util.types";
import { AuthRequest } from "../shared/utils/auth.request";

export class CourseController {
  private service = new CourseService();

  getCourses = (req: Request, res: Response) => {
    const courses = this.service.getCourses();
    res.status(200).json({
      message: "success",
      results: courses.length,
      data: courses,
    });
  };

  getCourse = (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    if (!id)
      return res
        .status(HttpErrorStatus.BadRequest)
        .json({ error: "ID required" });

    const course = this.service.getCourse(id);
    if (!course)
      return res
        .status(HttpErrorStatus.NotFound)
        .json({ error: "Course not found" });

    res.status(200).json({ message: "success", data: course });
  };

  createCourse = (req: AuthRequest, res: Response) => {
    if (!req.user) {
      return res
        .status(HttpErrorStatus.Unauthorized)
        .json({ message: "No token" });
    }

    try {
      const { title, description } = req.body;
      const image = req.file
        ? `../shared/uploads/${req.file.filename}`
        : undefined;

      const course = this.service.createCourse(title, description, image);
      res.status(201).json({ message: "success", data: course });
    } catch (error) {
      res.status(500).json({ message: "Error creating course", error });
    }
  };

  updateCourse = (req: AuthRequest, res: Response) => {
    if (!req.user) {
      return res
        .status(HttpErrorStatus.Unauthorized)
        .json({ message: "No token" });
    }

    const id = req.params.id;
    if (!id)
      return res
        .status(HttpErrorStatus.BadRequest)
        .json({ error: "ID required" });

    const course = this.service.getCourse(id);
    if (!course)
      return res
        .status(HttpErrorStatus.NotFound)
        .json({ error: "Course not found" });

    // ownership or admin check
    if (req.user.role !== "ADMIN") {
      return res
        .status(HttpErrorStatus.Forbidden)
        .json({ message: "Forbidden" });
    }

    const { title, description } = req.body;
    const image = req.file
      ? `./shared/uploads/${req.file.filename}`
      : req.body.image;
    const updated = this.service.updateCourse(id, title, description, image);

    res.status(200).json({ message: "success", data: updated });
  };

  deleteCourse = (req: AuthRequest, res: Response) => {
    if (!req.user) {
      return res
        .status(HttpErrorStatus.Unauthorized)
        .json({ message: "No token" });
    }

    const id = req.params.id;
    if (!id)
      return res
        .status(HttpErrorStatus.BadRequest)
        .json({ error: "ID required" });

    const course = this.service.getCourse(id);
    if (!course)
      return res
        .status(HttpErrorStatus.NotFound)
        .json({ error: "Course not found" });

    if (req.user.role !== "ADMIN") {
      return res
        .status(HttpErrorStatus.Forbidden)
        .json({ message: "Forbidden" });
    }

    this.service.deleteCourse(id);
    res.status(200).json({ message: "success" });
  };
}
