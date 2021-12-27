import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  API_SERVER = "http://localhost:3000/datos-sesiones";
  constructor(private httpClient: HttpClient) { }



  public getData() {
    return this.httpClient.get<[string, string][]>(`${this.API_SERVER}`);
  }

  public createMessage(message: any): Observable<Object> {

    return this.httpClient.post(`${this.API_SERVER}/messages`, {
      company: message.company,
      user: message.user,
      interval: message.interval,
      firstDay: message.firstDay,
      lastDay: message.lastDay
    
    });
  }
}
