import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessageDto } from '../messages.dto'
import { SessionService } from './session-service'


@Controller('datos-sesiones')
export class DatosSesionesController {
    constructor(private sessionService: SessionService) { }


    filter: MessageDto;
    

    @Post('/messages')
    async test(@Body() message: MessageDto): Promise<MessageDto> {
        this.filter = message;
        return message;
    }



    @Get()
    async getData(): Promise<[string, string][]> {

        let date: string[] = [];
        let sessions: string[] = [];
        let points: [string, string][] = [];
        this.sessionService.init();
        date= await this.sessionService.getDays(this.filter.firstDay, this.filter.lastDay);
       //await this.sessionService.oneOrAll(this.filter.company, this.filter.user, this.filter.firstDay, this.filter.lastDay);
        await this.sessionService.makeAuxTableOne(this.filter.company, this.filter.user, this.filter.firstDay, this.filter.lastDay);
        sessions = await this.sessionService.getSessions(this.filter.interval);
        this.sessionService.close();
        
        console.log(points.length);

        for (var i = 0; i < date.length; i++) {
            points[i] = [date[i], sessions[i]];
        }
    
        date = [];
        sessions = [];
        this.sessionService.clean();

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
