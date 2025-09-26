import { UserRepository } from "./users.repository";
import { User } from "../generated/prisma";

export class UserService {
  private repository = new UserRepository();

  getUsers(): Promise<User[]> {
    return this.repository.findAll();
  }

  getUser(id: string): Promise<User | undefined> {
    return this.repository.findById(id);
  }

  createUser(
    name: string,
    email: string,
    password: string,
    role: "ADMIN" | "COACH" | "STUDENT" = "STUDENT"
  ): Promise<User> {
    return this.repository.create({ name, email, password, role });
  }

  updateUser(
    id: string,
    name?: string,
    email?: string,
    role?: "ADMIN" | "COACH" | "STUDENT"
  ): Promise<User | null> {
    const updates: Partial<Omit<User, "id" | "createdAt">> = {};

    if (name !== undefined) updates.name = name;
    if (email !== undefined) updates.email = email;
    if (role !== undefined) updates.role = role;

    return this.repository.update(id, updates);
  }

  deleteUser(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
