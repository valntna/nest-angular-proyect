import { Test, TestingModule } from '@nestjs/testing';
import { DatosSesionesController } from './datos-sesiones.controller';

describe('DatosSesionesController', () => {
  let controller: DatosSesionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatosSesionesController],
    }).compile();

    controller = module.get<DatosSesionesController>(DatosSesionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
