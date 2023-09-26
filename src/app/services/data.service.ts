import {Injectable, signal} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {LocalDAta} from "../interfaces/local-data";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  private filtersSubject = new BehaviorSubject<any>({});

  filters$ = this.filtersSubject.asObservable();


  controlFilter = signal(false)
  selectedUsers = signal<LocalDAta[]>([])


  changeFilterState(newValue: boolean) {
    this.controlFilter.set(newValue)
  }
  setFilters(filters: any) {
    this.filtersSubject.next(filters);
  }

  usersToChange = signal<LocalDAta[]>([])



}
