import { Component } from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {

  filter:boolean = false;

  constructor(private dataService: DataService) {
    this.dataService.filterValue$.subscribe(value => {
      this.filter = value
    });
  }

}
