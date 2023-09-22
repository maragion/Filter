import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Data} from "../interfaces/data";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  url: string = "https://cars.cprogroup.ru/api/rubetek/angular-testcase-list/"
  getData() {
    return this.http.get<Data>(this.url);
  }


}
