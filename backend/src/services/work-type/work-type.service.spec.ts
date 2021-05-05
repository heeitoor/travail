import { Test, TestingModule } from '@nestjs/testing';
import { WorkTypeService } from './work-type.service';

describe('WorkTypeService', () => {
  let service: WorkTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkTypeService],
    }).compile();

    service = module.get<WorkTypeService>(WorkTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
