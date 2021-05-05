import { ApiProperty } from '@nestjs/swagger';
import BaseEntity from './base-entity';

class WorkType extends BaseEntity {
  @ApiProperty()
  workTypeId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cnae: string;
}

export { WorkType };
