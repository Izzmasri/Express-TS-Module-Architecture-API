// src/users/users.repository.ts
import { User } from "./users.entity";
import { BaseRepository } from "../shared/utils/base.repository";
import { UserModel } from "./users.model";

type CreateUserPayload = Omit<User, "id" | "createdAt" | "updatedAt">;
type UpdateUserPayload = Partial<Omit<User, "id" | "createdAt">>;

export class UserRepository extends BaseRepository<
  User,
  CreateUserPayload,
  UpdateUserPayload
> {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ email: email.toLowerCase() });
  }
}
