import { Request, Response } from "express";
import { UserService } from "./users.service";
import { CreateUserDTO, UpdateUserDTO } from "./util/users.dto";
import { AuthRequest } from "../shared/utils/auth.request";
import { HttpErrorStatus, StringObject } from "../shared/utils/util.types";

export class UserController {
  private service = new UserService();

  getUsers = (req: Request, res: Response) => {
    const users = this.service.getUsers();
    res.status(200).json({
      message: "success",
      results: users.length,
      data: users,
    });
  };

  getUser = (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(404).json({ error: "ID required" });

    const user = this.service.getUser(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "success", data: user });
  };

  createUser = (
    req: Request<StringObject, StringObject, CreateUserDTO>,
    res: Response
  ) => {
    try {
      const { name, email, password, role } = req.body;

      const newUser = this.service.createUser(name, email, password, role);
      res.status(201).json({ message: "success", data: newUser });
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  };

  updateUser = (
    req: Request<{ id: string }, StringObject, UpdateUserDTO>,
    res: Response
  ) => {
    const id = req.params.id;
    if (!id) return res.status(404).json({ error: "ID required" });

    const { name, email } = req.body;
    const user = this.service.updateUser(id, name, email);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "success", data: user });
  };

  deleteUser = (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(404).json({ error: "ID required" });

    const user = this.service.deleteUser(id);
    res.status(200).json({
      message: "success",
    });
  };

  getMe = (req: AuthRequest, res: Response) => {
    if (!req.user)
      return res
        .status(HttpErrorStatus.Unauthorized)
        .json({ message: "No token" });
    const me = this.service.getUser(req.user.id);
    if (!me)
      return res
        .status(HttpErrorStatus.NotFound)
        .json({ message: "User not found" });
    const { password, ...safe } = me;
    res.json(safe);
  };

  updateMe = (req: AuthRequest, res: Response) => {
    if (!req.user)
      return res
        .status(HttpErrorStatus.Unauthorized)
        .json({ message: "No token" });
    const { name, email } = req.body;
    const updated = this.service.updateUser(req.user.id, name, email);
    if (!updated)
      return res
        .status(HttpErrorStatus.NotFound)
        .json({ message: "User not found" });
    const { password, ...safe } = updated;
    res.json(safe);
  };

  createCoach = (
    req: Request<StringObject, StringObject, CreateUserDTO>,
    res: Response
  ) => {
    const { name, email, password } = req.body;
    const user = this.service.createUser(name, email, password, "COACH");
    const { password: _pw, ...safe } = user;
    res.status(201).json(safe);
  };
}
