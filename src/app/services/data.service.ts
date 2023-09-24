import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  private filtersSubject = new BehaviorSubject<any>({});

  filters$ = this.filtersSubject.asObservable();

  private filterHideSubject = new BehaviorSubject<boolean>(false);
  filterValue$ = this.filterHideSubject.asObservable();

  updateValue(newValue: boolean) {
    this.filterHideSubject.next(newValue);
  }
  setFilters(filters: any) {
    this.filtersSubject.next(filters);
  }
}
