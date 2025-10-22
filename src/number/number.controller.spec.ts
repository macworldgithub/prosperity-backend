import { Test, TestingModule } from '@nestjs/testing';
import { NumberController } from './number.controller';
import { NumberService } from './number.service';

describe('NumberController', () => {
  let controller: NumberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NumberController],
      providers: [NumberService],
    }).compile();

    controller = module.get<NumberController>(NumberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
