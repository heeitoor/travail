import { ApiProperty } from '@nestjs/swagger';
import BaseEntity from './base-entity';

class User extends BaseEntity {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;

  //@ApiProperty()
  type: UserType;

  //@ApiProperty()
  active: boolean;

  //@ApiProperty()
  lastLoginAt: Date;
}

enum UserType {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  PROFESSIONAL = 'PROFESSIONAL',
  COMPANY = 'COMPANY',
}

export { User, UserType };
