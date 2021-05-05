import { ApiProperty } from '@nestjs/swagger';
import { UserType } from 'src/entities/user';

export class CreateUser {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  type: UserType;

  @ApiProperty()
  workTypeId?: number;
}

export class ActivateUser {
  @ApiProperty()
  code: string;
}

export class RecoverUser {
  @ApiProperty()
  email: string;
}

export class LoginUser extends RecoverUser {
  @ApiProperty()
  password: string;
}

export class ChangePassword {
  @ApiProperty()
  password: string;
}
