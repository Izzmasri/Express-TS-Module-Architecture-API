import { Request, Response } from "express";
import { UserService } from "./users.service";
import { CreateUserDTO, UpdateUserDTO } from "./util/users.dto";
import { AuthRequest } from "../shared/utils/auth.request";
import { HttpErrorStatus, StringObject } from "../shared/utils/util.types";

export class UserController {
  private service = new UserService();

  getUsers = async (req: Request, res: Response) => {
    const users = await this.service.getUsers();
    res.status(200).json({
      message: "success",
      results: users.length,
      data: users,
    });
  };

  getUser = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(404).json({ error: "ID required" });

    const user = await this.service.getUser(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "success", data: user });
  };

  createUser = async (
    req: Request<StringObject, StringObject, CreateUserDTO>,
    res: Response
  ) => {
    try {
      const { name, email, password, role } = req.body;

      const newUser = await this.service.createUser(
        name,
        email,
        password,
        role
      );
      res.status(201).json({ message: "success", data: newUser });
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  };

  updateUser = async (
    req: Request<{ id: string }, StringObject, UpdateUserDTO>,
    res: Response
  ) => {
    const id = req.params.id;
    if (!id) return res.status(404).json({ error: "ID required" });

    const { name, email } = req.body;
    const user = await this.service.updateUser(id, name, email);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "success", data: user });
  };

  deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(404).json({ error: "ID required" });

    const user = await this.service.deleteUser(id);
    res.status(200).json({
      message: "success",
    });
  };

  getMe = async (req: AuthRequest, res: Response) => {
    if (!req.user)
      return res
        .status(HttpErrorStatus.Unauthorized)
        .json({ message: "No token" });
    const me = await this.service.getUser(req.user.id);
    if (!me)
      return res
        .status(HttpErrorStatus.NotFound)
        .json({ message: "User not found" });
    const { password, ...safe } = me;
    res.json(safe);
  };

  updateMe = async (req: AuthRequest, res: Response) => {
    if (!req.user)
      return res
        .status(HttpErrorStatus.Unauthorized)
        .json({ message: "No token" });
    const { name, email } = req.body;
    const updated = await this.service.updateUser(req.user.id, name, email);
    if (!updated)
      return res
        .status(HttpErrorStatus.NotFound)
        .json({ message: "User not found" });
    const { password, ...safe } = updated;
    res.json(safe);
  };

  createCoach = async (
    req: Request<StringObject, StringObject, CreateUserDTO>,
    res: Response
  ) => {
    const { name, email, password } = req.body;
    const user = await this.service.createUser(name, email, password, "COACH");
    const { password: _pw, ...safe } = user;
    res.status(201).json(safe);
  };
}
