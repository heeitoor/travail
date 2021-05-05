import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorkTypeService } from 'src/services/work-type/work-type.service';

@Controller('work-type')
@ApiTags('work-type')
export class WorkTypeController {
  constructor(private readonly workTypeService: WorkTypeService) {}

  @Get(':name')
  getLikeName(@Param('name') name: string) {
    return this.workTypeService.get(name);
  }
}
