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

// ------------------

import { Model, UpdateQuery, ObjectId } from "mongoose";

export interface BaseEntity {
  id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * T = Mongoose Document type
 * C = Create payload (without id, createdAt, updatedAt)
 * U = Update payload (partial, without id, createdAt)
 */
export class BaseRepository<
  T extends BaseEntity,
  C extends Omit<Partial<T>, "id" | "createdAt" | "updatedAt">,
  U extends Partial<Omit<T, "id" | "createdAt">>
> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async create(payload: C): Promise<T> {
    const doc = new this.model(payload);
    return doc.save();
  }

  async update(id: string, updates: U): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, updates as UpdateQuery<T>, {
      new: true,
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return result !== null;
  }
}
