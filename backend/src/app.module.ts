import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatosSesionesController } from './datos-sesiones/datos-sesiones.controller';

@Module({
  imports: [],
  controllers: [AppController, DatosSesionesController],
  providers: [AppService],
})
export class AppModule {}
