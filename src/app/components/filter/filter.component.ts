import {Component} from '@angular/core';
import {DataService} from "../../services/data.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  name: string = '';
  email: string = '';
  phone: string = '';
  is_admin: boolean | string = "all";
  update_at: number | string = "";
  create_at: number | string = "";
  status: string = 'all';

  constructor(private dataService: DataService) {
  }

  applyFilters() {
    const filters = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      is_admin: this.is_admin,
      update_at: new DatePipe("en").transform(this.update_at, "dd.MM.yyyy"),
      create_at: new DatePipe("en").transform(this.create_at, "dd.MM.yyyy"),
      status: this.status,
    };

    this.dataService.setFilters(filters);
    console.log('фильтры', filters)
  }
}
