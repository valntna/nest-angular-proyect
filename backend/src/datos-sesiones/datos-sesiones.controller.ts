import { Controller, Get, Post } from '@nestjs/common';

import { SessionService } from './session-service'


@Controller('datos-sesiones')
export class DatosSesionesController {
    constructor(private sessionService: SessionService) { }

    @Get()
    async getCalendar(): Promise<[string, string][]> {

        await this.sessionService.init();
        let date: string[] = await this.sessionService.getDays();
        await this.sessionService.makeAuxTableOne();
        let sessions: string[] = await this.sessionService.getSessions();
        
        //this.sessionService.printArray(date);
        //this.sessionService.printArray(sessions);

        this.sessionService.close();
        let points: [string, string][] = [];
        for (var i = 0; i < date.length; i++) {
            points[i] = [date[i], sessions[i]];
        }

        //console.log(date.length);
        //console.log(sessions.length);

        return points;
    }


    //getSessions(): [string, number][] {
    //    const sessionService = new SessionService();
    //    sessionService.init();

    //    sessionService.getCalendar();

    //    sessionService.close();
    //    return [['test', 3]];

    //}
    
}
