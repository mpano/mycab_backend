import { Test, TestingModule } from '@nestjs/testing';
import { PrivatebookingController } from './privatebooking.controller';

describe('PrivatebookingController', () => {
  let controller: PrivatebookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivatebookingController],
    }).compile();

    controller = module.get<PrivatebookingController>(PrivatebookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
