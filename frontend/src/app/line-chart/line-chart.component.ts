import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})

export class LineChartComponent implements OnInit {

  title = 'Sesiones Activas';


  constructor() {
    Chart.register(...registerables);
  }


  ngOnInit() {
    const lineCanvasEle: any = document.getElementById('canvas');
    new Chart(lineCanvasEle.getContext('2d'), {

      type: 'line',
      data: {

        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets:
          [
            {
              label: 'Sesiones Activas',
              data: [85, 72, 78, 75, 77, 75],
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
