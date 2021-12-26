import { Controller, Get, Post } from '@nestjs/common';

import { SessionService } from './session-service'


@Controller('datos-sesiones')
export class DatosSesionesController {
    constructor(private sessionService: SessionService) { }

    @Get()
    async getCalendar(): Promise<string[]> {
        await this.sessionService.init();
        let date: string[] = await this.sessionService.getDays();
        let test: string[] = await this.sessionService.getUsers();
        
        this.sessionService.printArray(date);
        this.sessionService.printArray(test);
        this.sessionService.close();
        return test;
    }


    //getSessions(): [string, number][] {
    //    const sessionService = new SessionService();
    //    sessionService.init();

    //    sessionService.getCalendar();

    //    sessionService.close();
    //    return [['test', 3]];

    //}
        //sessionService.printCalendar(date)
        //sessionService.getCalendar()



    //getCalendar(): string[] {
    //    const sessionService = new SessionService();
    //    var date: string[]=[];
    //    sessionService.init();
    //    date = sessionService.getCalendar(); 
    //    sessionService.close();
    //    sessionService.printCalendar(date);
    //    return date;
    //}


    //async getCalendar(): Promise<string[]> {
    //    const sessionService = new SessionService();
    //    sessionService.init();

    //    var date: string[] = await sessionService.getCalendar();
    //    sessionService.printCalendar(date);
    //    sessionService.close();
    //    return date;
    //}
    
}
