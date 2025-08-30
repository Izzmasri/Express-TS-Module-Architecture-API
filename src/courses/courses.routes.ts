import { Router } from "express";
import { CourseController } from "./courses.controller";
import { uploadSingle } from "../shared/utils/multer.config";
import {
  authorizeRoles,
  requireAuth,
} from "../shared/middlewares/auth.middleware";

const router = Router();
const courseController = new CourseController();

router.get("/", courseController.getCourses);
router.get("/:id", courseController.getCourse);
router.post(
  "/",
  requireAuth,
  authorizeRoles("COACH", "ADMIN"),
  uploadSingle("image"),
  courseController.createCourse
);
router.patch(
  "/:id",
  requireAuth,
  uploadSingle("image"),
  courseController.updateCourse
);
router.delete("/:id", requireAuth, courseController.deleteCourse);

export const courseRouter = router;
