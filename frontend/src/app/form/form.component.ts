import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {LineChartComponent} from '../line-chart/line-chart.component'

interface Data {
  
  company: string;
  user: string;
  interval: number;
  firstDay: string;
  lastDay: string;
}

//export let points:[string,string][]=[];


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  constructor(private apiService: ApiService, private lineChart: LineChartComponent) { }
  

  ngOnInit() { }

  
    async onClickSubmit(data: Data) {

      console.log(data);


      let message = {
        company: data.company,
        user: data.user,
        interval: data.interval,
        firstDay: data.firstDay,
        lastDay: data.lastDay
      };

      console.log(await this.apiService.createMessage(message).toPromise());
   

      let points: [string, string][] = [];
      
      points = await this.apiService.getData().toPromise();
 
      this.lineChart.makeGraph(points);

      points = [];
      
    }
 }
