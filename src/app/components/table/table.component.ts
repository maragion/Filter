import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {User} from "../../interfaces/user";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {NgClass} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [MatTableModule, MatIconModule, NgClass, MatButtonModule],
})
export class TableComponent implements OnInit{

  constructor(private http: HttpService) {
  }

  users: User[] = [];

  ngOnInit() {
    this.http.getData().subscribe((data: any) => this.users = data.users);
  }

  displayedColumns: string[] = ['actions', 'login', 'email', 'phone'];

}



