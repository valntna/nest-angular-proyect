import { Controller, Get, Post } from '@nestjs/common';
import { SessionService } from './session-service'

@Controller('datos-sesiones')
export class DatosSesionesController {

    @Get()
    getSessions(): [string, number][] {
        const sessionService = new SessionService();
        sessionService.init();
        getData();
        sessionService.close();
        return [['test', 3]];

    }
    
}
