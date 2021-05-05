import { Injectable } from '@nestjs/common';
import { WorkTypeRepository } from 'src/repositories/work-type.repository';

@Injectable()
export class WorkTypeService {
  constructor(private workTypeRepository: WorkTypeRepository) {}

  get(namePart: string) {
    return this.workTypeRepository.getLikeName(namePart?.toUpperCase());
  }
}
