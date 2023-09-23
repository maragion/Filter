import {Component} from '@angular/core';
import {Filter} from "../../interfaces/filter";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {


  filter: Filter = {
    "name": "",
    "email": "",
    "phone": 0,
    "create_at": 0,
    "update_at": 0,
    "is_admin": false,
    "status": ""
  }
}
