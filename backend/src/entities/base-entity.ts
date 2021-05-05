import { ApiProperty } from '@nestjs/swagger';

export default class BaseEntity {
  //@ApiProperty()
  id?: number;

  //@ApiProperty()
  createdAt?: Date;

  //@ApiProperty()
  updatedAt?: Date;
}
