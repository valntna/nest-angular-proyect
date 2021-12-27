import { Component, Injectable, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


interface Data {
  
  company: string;
  user: string;
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
  

  ngOnInit(): void {
  }

  async onClickSubmit(data: Data ) {
   
    console.log(data);
    

    let message = {
      company: data.company,
      user: data.user,
      interval: data.interval,
      firstDay: data.firstDay,
      lastDay: data.lastDay
    };

    this.apiService.createMessage(message).toPromise();

    const points: [string, string][] = await this.apiService.getData().toPromise();
  
    for (var i = 0; i < points.length; i++) {
      console.log(points[i]);
    }
    
  }

}
