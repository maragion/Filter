import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  constructor(private http: HttpService) {
  }


  ngOnInit() {
    this.http.getData().subscribe((data: any) => {console.log(data)});
  }

}



