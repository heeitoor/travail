import { ApiProperty } from '@nestjs/swagger';
import BaseEntity from './base-entity';

class UserWorkType extends BaseEntity {
  workTypeId: number;

  userId: number;

  @ApiProperty()
  description: string;
}

export { UserWorkType };
