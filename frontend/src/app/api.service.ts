import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  API_SERVER = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }

  public getData(company:string, user:string, interval:number, firstDay:string, lastDay:string) {
    return this.httpClient.get<[string, string][]>(`${this.API_SERVER}/datos-sesiones`);
  }

}
