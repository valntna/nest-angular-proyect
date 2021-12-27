import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessageDto } from '../messages.dto'
import { SessionService } from './session-service'


@Controller('datos-sesiones')
export class DatosSesionesController {
    constructor(private sessionService: SessionService) { }


    filter: MessageDto;

    @Post('/messages')
    async test(@Body() message: MessageDto): Promise<MessageDto> {
        console.log(message);
        this.filter = message;
        return message;
    }



    @Get()
    async getData(): Promise<[string, string][]> {

        this.sessionService.init();
        let date: string[] = await this.sessionService.getDays(this.filter.firstDay, this.filter.lastDay);
        await this.sessionService.makeAuxTableOne(this.filter.company, this.filter.user, this.filter.firstDay, this.filter.lastDay);
        let sessions: string[] = await this.sessionService.getSessions(this.filter.interval);
        
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
