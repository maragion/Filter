import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
// import {Filter} from "../interfaces/filter";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  filter: {} | null = null

  private dataSubject = new BehaviorSubject<any>(this.filter);
  public data$ = this.dataSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }
}
