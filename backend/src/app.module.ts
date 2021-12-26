import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatosSesionesController } from './datos-sesiones/datos-sesiones.controller';
import {SessionService} from './datos-sesiones/session-service'

@Module({
  imports: [],
  controllers: [AppController, DatosSesionesController],
    providers: [AppService, SessionService],
})
export class AppModule {}
