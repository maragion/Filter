import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {User} from "../../interfaces/user";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {Data} from "../../interfaces/data";
import {UserData} from "../../interfaces/user-data";
import {FinalUser} from "../../interfaces/final-user";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [MatTableModule, MatIconModule, NgClass, MatButtonModule, NgIf, DatePipe],
})
export class TableComponent implements OnInit {

  constructor(private http: HttpService) {
  }

  users: User[] = [];
  usersData: UserData[] | null = null;

  usersFinal: FinalUser[]  = []

  ngOnInit() {
    this.http.getData().subscribe((data: Data) => {
      this.users = data.users;
      this.usersData = data.data;

      if (this.usersData) {
        this.usersData.forEach((userData) => {
          this.users.forEach((user) => {
            if (userData.user_id === user.id) {
              this.usersFinal.push({...user, ...userData})
            }
          })
        })
      }
    });
  }

  dataSource = this.usersFinal;
  displayedColumns: string[] = ['actions', 'login', 'email', 'phone', "is_admin", "update_at", "create_at", "status", "is_ecp"];

}



