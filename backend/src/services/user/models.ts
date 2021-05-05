import { ApiProperty } from '@nestjs/swagger';

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
