import {Component} from '@angular/core';
// import {Filter} from "../../interfaces/filter";
import {DataService} from "../../services/data.service";
import {Filter} from "../../interfaces/filter";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  constructor(private dataService: DataService) {}


  filter:Filter = {
    "name": "",
    "email": "",
    "phone": 0,
    "create_at": 0,
    "update_at": 0,
    "is_admin": "all",
    "status": "all"
  }

  sendData() {
    this.dataService.setData(this.filter);
  }
}
