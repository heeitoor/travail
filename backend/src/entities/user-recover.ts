import { ApiProperty } from "@nestjs/swagger";
import BaseEntity from "./base-entity";

class UserRecover extends BaseEntity {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  confirmationCode: string;

  @ApiProperty()
  type: UserRecoverType;
}

enum UserRecoverType {
  ACTIVATE = "ACTIVATE",
  RECOVER = "RECOVER",
}

export { UserRecover, UserRecoverType };
