import { DogsService } from '@app/dogs/services/dogs/dogs.service';
import { Test, TestingModule } from '@nestjs/testing';
import { DogsController } from './dogs.controller';

describe('DogsController', () => {
  let controller: DogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogsController],
      providers: [DogsService],
    }).compile();

    controller = module.get<DogsController>(DogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should say woof', () => {
    const valueRegex = /woof/gi;

    expect(valueRegex.test(controller.index().message)).toBeTruthy();
  });
});
