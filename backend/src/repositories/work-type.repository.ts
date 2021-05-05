import { Injectable } from '@nestjs/common';
import { WorkType } from 'src/entities/work-type';
import RepositoryBase from './repository-base';

@Injectable()
export class WorkTypeRepository extends RepositoryBase<WorkType> {
  constructor() {
    super('work_type');
  }

  getLikeName(likeQuery: string): any {
    const query = this.select(['id', 'name']).where('name', 'like', `%${likeQuery}%`).orderBy('name', 'asc').limit(10);
    return query;
  }
}
