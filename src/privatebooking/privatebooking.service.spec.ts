import { Test, TestingModule } from '@nestjs/testing';
import { PrivatebookingService } from './privatebooking.service';

describe('PrivatebookingService', () => {
  let service: PrivatebookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrivatebookingService],
    }).compile();

    service = module.get<PrivatebookingService>(PrivatebookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
