import { Router } from "express";
import { UserController } from "./users.controller";
import {
  requireAuth,
  authorizeRoles,
} from "../shared/middlewares/auth.middleware";

const router = Router();
const userController = new UserController();

router.get("/", requireAuth, userController.getUsers);

router.get("/me", requireAuth, userController.getMe);
router.put("/me", requireAuth, userController.updateMe);
router.post(
  "/coach",
  requireAuth,
  authorizeRoles("ADMIN"),
  userController.createCoach
);

router.post("/", requireAuth, userController.createUser);
router.get("/:id", userController.getUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export const userRouter = router;
