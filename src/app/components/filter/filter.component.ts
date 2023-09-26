import {Component} from '@angular/core';
import {DataService} from "../../services/data.service";
import {DatePipe} from "@angular/common";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  constructor(private dataService: DataService, private fb: FormBuilder) {
  }

  filterForm = this.fb.group({
    name: [""],
    email: [""],
    phone: [""],
    is_admin: ["all"],
    update_at: [""],
    create_at: [""],
    status: ["all"],
  })

  getFilters() {
    return {
      name: this.filterForm.value.name,
      email: this.filterForm.value.email,
      phone: this.filterForm.value.phone,
      is_admin: this.filterForm.value.is_admin,
      update_at: new DatePipe("en").transform(this.filterForm.value.update_at, "dd.MM.yyyy"),
      create_at: new DatePipe("en").transform(this.filterForm.value.create_at, "dd.MM.yyyy"),
      status: this.filterForm.value.status,
    }
  }

  applyFilters() {
    let filters = this.getFilters()
    this.dataService.setFilters(filters);
  }

  resetFilters() {
    this.filterForm.reset({
      name: "",
      email: "",
      phone: "",
      is_admin: "all",
      update_at: "",
      create_at: "",
      status: "all"
    });

    let filters = this.getFilters()
    this.dataService.setFilters(filters);
  }

  changeFilterState() {
    this.dataService.changeFilterState(false);
  }

  clearField(field: string) {
    this.filterForm.get(field)?.reset();
  }
}
