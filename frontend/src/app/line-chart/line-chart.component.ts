import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
//import { points } from '../form/form.component';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})

export class LineChartComponent {

  title = 'Sesiones Activas';


  constructor() {
    Chart.register(...registerables);
  }



  makeGraph(points:[string,string][]) {

    let chartStatus = Chart.getChart("canvas"); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
    console.log(points.length);

    let xAxis: string[] = [];
    let yAxis: number[] = [];
    for (var i = 0; i < points.length; i++) {
      xAxis.push(points[i][0]);
      yAxis.push(Number(points[i][1]));
    }

    const lineCanvasEle: any = document.getElementById('canvas');
    new Chart(lineCanvasEle.getContext('2d'), {

      type: 'line',
      data: {

        labels: xAxis,

        datasets:
          [
            {
              label: 'Sesiones Activas',
              data: yAxis,
              backgroundColor: 'rgb(75, 192, 192)',
              borderColor: 'rgb(75, 192, 192)',
              fill: false,
              tension: 0.3,
              pointBackgroundColor: 'rgb(75, 192, 192)',
              pointHoverBackgroundColor: 'rgb(75, 192, 192)',
            }
          ]
      }
    });

    
   

  }
  

}
