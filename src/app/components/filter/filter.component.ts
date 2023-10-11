import {Component} from '@angular/core';
import {DataService} from "../../services/data.service";
import {DatePipe} from "@angular/common";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  constructor(private dataService: DataService, private fb: FormBuilder) {
  }

  filterForm = this.fb.group({
    name: ["", [Validators.pattern("(^$)|(^[A-Za-z0-9]+$)")]],
    email: ["", Validators.pattern("(^$)|(^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$)")],
    phone: ["", Validators.pattern("(^$)|(?:\\+|\\d)[\\d\\-\\(\\) ]{9,}\\d")],
    is_admin: ["all"],
    update_at: ["", Validators.pattern('[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])')],
    create_at: ["", Validators.pattern("[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])")],
    status: ["all"],
  })


  getFilters() {
    return {
      name: this.filterForm.value.name,
      email: this.filterForm.value.email,
      phone: Number(this.filterForm.value.phone),
      is_admin: this.filterForm.value.is_admin,
      update_at: new DatePipe("en").transform(this.filterForm.value.update_at, "dd.MM.yyyy"),
      create_at: new DatePipe("en").transform(this.filterForm.value.create_at, "dd.MM.yyyy"),
      status: this.filterForm.value.status,
    }
  }

  applyFilters() {
    if (this.filterForm.valid) {
      let filters = this.getFilters()
      this.dataService.setFilters(filters);
    }
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
