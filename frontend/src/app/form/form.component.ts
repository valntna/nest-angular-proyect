import { Component, Injectable, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


interface Data {
  user: string;
  company: string;
  interval: number;
  firstDay: string;
  lastDay: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  points: [string, string][] = [];

  ngOnInit(): void {
  }

  onClickSubmit(data: Data ) {
    console.log('recibimos usuario:' + data.user + ' comp: ' + data.company + ' intervalo: ' + data.interval + ' fechas: ' + data.firstDay + '-' + data.lastDay);
    this.apiService.getData(data.user, data.company, data.interval, data.firstDay, data.lastDay).subscribe((result) => {
      this.points = result;
    });
    console.log(this.points[0]);
  }

}
