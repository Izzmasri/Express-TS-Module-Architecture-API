// src/users/users.repository.ts
// import { User } from "./users.entity";
// import { BaseRepository } from "../shared/utils/base.repository";
// import { userData } from "./users.data";

// type CreateUserPayload = Omit<User, "id" | "createdAt" | "updatedAt">;
// type UpdateUserPayload = Partial<Omit<User, "id" | "createdAt">>;

// export class UserRepository extends BaseRepository<
//   User,
//   CreateUserPayload,
//   UpdateUserPayload
// > {
//   constructor() {
//     super(userData);
//   }

//   findByEmail(email: string): User | undefined {
//     return this.findAll().find(
//       (u) => u.email.toLowerCase() === email.toLowerCase()
//     );
//   }
// }
// ---------------------------------

// using prisma

import { PrismaClient, User } from "../generated/prisma";
import { BaseRepository } from "../shared/utils/base.repository";

const prisma = new PrismaClient();

type CreateUserPayload = Omit<User, "id" | "createdAt" | "updatedAt">;
type UpdateUserPayload = Partial<Omit<User, "id" | "createdAt">>;

export class UserRepository extends BaseRepository<
  User,
  CreateUserPayload,
  UpdateUserPayload
> {
  constructor() {
    super(prisma.user, prisma);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.model.findUnique({ where: { email } });
  }
}
