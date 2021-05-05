import { Injectable } from "@nestjs/common";
import { UserRecover } from "src/entities/user-recover";

import RepositoryBase from "./repository-base";

@Injectable()
export class UserRecoverRepository extends RepositoryBase<UserRecover> {
  constructor() {
    super("user_recover");
  }

  async add(entity: UserRecover): Promise<number> {
    return await super.insert(entity);
  }

  async delete(id: number): Promise<void> {
    await super.delete(id);
  }

  async getByConfirmationCode(confirmationCode: string): Promise<UserRecover> {
    return await super
      .select("*")
      .where("confirmationCode", confirmationCode)
      .first();
  }
}
