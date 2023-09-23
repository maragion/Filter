import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {Data} from "../../interfaces/data";
import {FinalUser} from "../../interfaces/final-user";
import {DataService} from "../../services/data.service";
import {Filter} from "../../interfaces/filter";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [MatTableModule, MatIconModule, NgClass, MatButtonModule, NgIf, DatePipe],
})
export class TableComponent implements OnInit {

  constructor(private http: HttpService, private data: DataService) {
  }

  dataSource = new MatTableDataSource<FinalUser>();


  usersFinal: FinalUser[] = []
  filter: Filter = {
    "name": "",
    "email": "",
    "phone": 0,
    "create_at": 0,
    "update_at": 0,
    "is_admin": "all",
    "status": "all"};
  ready: boolean = false;

  sortedData: FinalUser[] = [];

  ngOnInit() {
    this.http.getData().pipe(
      map((data: Data) => {
          data.users.forEach((user) => {
            data.data.forEach((userData) => {
              if (user.id === userData.user_id) {
                this.usersFinal.push({...user, ...userData})
              }
            })

          })
          this.ready = true;
          this.dataSource = new MatTableDataSource(this.usersFinal);
          console.log(this.usersFinal)
        }
      )).subscribe();

    this.data.data$.subscribe((data: Filter) => {
      this.filter = data
      this.sortedData = this.usersFinal.filter((item) => {

        if (this.filter.name && item.name !== this.filter.name) {
          return false;
        }

        if (this.filter.email && item.email !== this.filter.email) {
          return false;
        }

        if (this.filter.phone && item.phone !== this.filter.phone) {
          return false;
        }

        if (this.filter.create_at && item.create_at !== this.filter.create_at) {
          return false;
        }

        if (this.filter.update_at && item.update_at !== this.filter.update_at) {
          return false;
        }

        if (
          this.filter.is_admin !== "all" &&
          item.is_admin !== this.filter.is_admin
        ) {
          return false;
        }

        if (
          this.filter.status !== "all" &&
          item.status !== this.filter.status
        ) {
          return false;
        }

        return true;
      });
      console.log(this.filter)
      console.log(this.sortedData)
      this.dataSource = new MatTableDataSource(this.sortedData);
    })
  }


  // dataSource = this.usersFinal;
  displayedColumns: string[] = ['actions', 'name', 'email', 'phone', "is_admin", "update_at", "create_at", "status", "is_ecp"];

}




