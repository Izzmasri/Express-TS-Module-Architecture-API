// for local data testing

// import { v4 as uuid } from "uuid";

// export interface BaseEntity {
//   id: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// /**
//  * T is your entity type (must have BaseEntity fields).
//  * C is the "create" payload = entity without id/createdAt/updatedAt.
//  * U is the "update" payload = partial of entity without id/createdAt.
//  */
// export class BaseRepository<
//   T extends BaseEntity,
//   C extends Omit<T, "id" | "createdAt" | "updatedAt">,
//   U extends Partial<Omit<T, "id" | "createdAt">>
// > {
//   protected items: T[];

//   constructor(seed: T[] = []) {
//     this.items = seed;
//   }

//   findAll(): T[] {
//     return this.items;
//   }

//   findById(id: string): T | undefined {
//     return this.items.find((i) => i.id === id);
//   }

//   create(payload: C): T {
//     const item = {
//       id: uuid(),
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       ...payload,
//     } as unknown as T;
//     this.items.push(item);
//     return item;
//   }

//   update(id: string, updates: U): T | null {
//     const item = this.findById(id);
//     if (!item) return null;
//     Object.assign(item, updates);
//     item.updatedAt = new Date();
//     return item;
//   }

//   delete(id: string): boolean {
//     const idx = this.items.findIndex((i) => i.id === id);
//     if (idx === -1) return false;
//     this.items.splice(idx, 1);
//     return true;
//   }
// }

// ---------------------------------

// for db data

import { PrismaClient } from "../../generated/prisma";

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Generic Prisma repository.
 * T = Prisma model type (User, Product, etc.)
 * C = Create payload
 * U = Update payload
 */
export class BaseRepository<
  T extends BaseEntity,
  C extends Omit<T, "id" | "createdAt" | "updatedAt">,
  U extends Partial<Omit<T, "id" | "createdAt">>
> {
  protected prisma: PrismaClient;
  protected model: any;

  constructor(model: any, prisma: PrismaClient) {
    this.prisma = prisma;
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return this.model.findMany();
  }

  async findById(id: string): Promise<T | undefined> {
    return this.model.findUnique({ where: { id } });
  }

  async create(payload: C): Promise<T> {
    return this.model.create({ data: payload });
  }

  async update(id: string, updates: U): Promise<T | null> {
    return this.model.update({
      where: { id },
      data: updates,
    });
  }

  async delete(id: string): Promise<boolean> {
    await this.model.delete({ where: { id } });
    return true;
  }
}
