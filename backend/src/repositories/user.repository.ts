import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user";

import RepositoryBase from "./repository-base";

@Injectable()
export class UserRepository extends RepositoryBase<User> {
  constructor() {
    super("user");
  }

  async getById(id: number): Promise<User> {
    return await super
      .select([
        "id",
        "email",
        "name",
        "active",
        "type",
        "lastLoginAt",
        "createdAt",
        "updatedAt",
      ])
      .where("id", id)
      .first();
  }

  async getAll(): Promise<User[]> {
    return await super.select([
      "id",
      "email",
      "name",
      "active",
      "type",
      "lastLoginAt",
      "createdAt",
      "updatedAt",
    ]);
  }

  async add(entity: User): Promise<number> {
    return await super.insert(entity);
  }

  async update(entity: User): Promise<void> {
    await super.update(entity);
  }

  async delete(id: number): Promise<void> {
    await super.delete(id);
  }

  async existsByEmail(email: string): Promise<boolean> {
    return !!(await super.select("id").where("email", email).first());
  }

  async getByEmailAndPass(
    email: string,
    password: string,
    active: boolean = true
  ): Promise<User> {
    return super
      .select("*")
      .where("email", email)
      .where("password", password)
      .where("active", active ?? true)
      .first();
  }

  async updateLastLoginAt(userId: number, date: Date): Promise<void> {
    await super.baseQuery().update("lastLoginAt", date).where("id", userId);
  }
}
