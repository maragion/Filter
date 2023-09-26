import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  setItem(key: string, value: any) {
    const item = JSON.stringify(value)
    localStorage.setItem(key, item)
  }

  getItem(key:string) {
    let item: any = localStorage.getItem(key)
    item = JSON.parse(item)
    return item
  }


}
