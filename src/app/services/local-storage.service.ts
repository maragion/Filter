import {Injectable} from '@angular/core';
import {LocalDAta} from "../interfaces/local-data";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  setItem(key: string, value: LocalDAta[]) {
    const item = JSON.stringify(value)
    localStorage.setItem(key, item)
  }

  getItem(key: string) {
    let item: any = localStorage.getItem(key)
    item = JSON.parse(item)
    return item
  }
}
