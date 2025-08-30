import { v4 as uuid } from "uuid";

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * T is your entity type (must have BaseEntity fields).
 * C is the "create" payload = entity without id/createdAt/updatedAt.
 * U is the "update" payload = partial of entity without id/createdAt.
 */
export class BaseRepository<
  T extends BaseEntity,
  C extends Omit<T, "id" | "createdAt" | "updatedAt">,
  U extends Partial<Omit<T, "id" | "createdAt">>
> {
  protected items: T[];

  constructor(seed: T[] = []) {
    this.items = seed;
  }

  findAll(): T[] {
    return this.items;
  }

  findById(id: string): T | undefined {
    return this.items.find((i) => i.id === id);
  }

  create(payload: C): T {
    const item = {
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...payload,
    } as unknown as T;
    this.items.push(item);
    return item;
  }

  update(id: string, updates: U): T | null {
    const item = this.findById(id);
    if (!item) return null;
    Object.assign(item, updates);
    item.updatedAt = new Date();
    return item;
  }

  delete(id: string): boolean {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) return false;
    this.items.splice(idx, 1);
    return true;
  }
}
