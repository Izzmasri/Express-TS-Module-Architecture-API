// src/users/users.repository.ts
import { User } from "./users.entity";
import { BaseRepository } from "../shared/utils/base.repository";
import { v4 as uuid } from "uuid";

const users: User[] = [
  {
    id: uuid(),
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "hashedpassword123",
    role: "ADMIN",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuid(),
    name: "Bob Smith",
    email: "bob@example.com",
    password: "hashedpassword456",
    role: "COACH",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuid(),
    name: "Charlie Brown",
    email: "charlie@example.com",
    password: "hashedpassword789",
    role: "STUDENT",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

type CreateUserPayload = Omit<User, "id" | "createdAt" | "updatedAt">;
type UpdateUserPayload = Partial<Omit<User, "id" | "createdAt">>;

export class UserRepository extends BaseRepository<
  User,
  CreateUserPayload,
  UpdateUserPayload
> {
  constructor() {
    super(users);
  }

  findByEmail(email: string): User | undefined {
    return this.findAll().find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
  }
}
