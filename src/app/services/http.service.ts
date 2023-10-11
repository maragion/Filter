import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Data} from "../interfaces/data";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  private readonly url: string = `${environment.apiUrl}/rubetek/angular-testcase-list/`

  getData() {
    return this.http.get<Data>(this.url);
  }


}
