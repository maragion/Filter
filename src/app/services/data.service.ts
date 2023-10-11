import {Injectable, signal} from '@angular/core';
import {Subject} from "rxjs";
import {LocalDAta} from "../interfaces/local-data";
import {Filter} from "../interfaces/filter";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
  }

  private filtersSubject = new Subject<Filter>();

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

  private statusSubject = new Subject<LocalDAta[]>()
  status$ = this.statusSubject.asObservable()

  changeStatus(statusData: LocalDAta[]) {
    this.statusSubject.next(statusData)
  }

  totalLength = signal<number>(0)
  numberOfSelectedUser = signal<number>(0)

}
