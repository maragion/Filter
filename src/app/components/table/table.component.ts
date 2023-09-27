import {Component, OnInit,} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {Data} from "../../interfaces/data";
import {FinalUser} from "../../interfaces/final-user";
import {DataService} from "../../services/data.service";
import {Filter} from "../../interfaces/filter";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {SelectionModel} from "@angular/cdk/collections";
import {LocalStorageService} from "../../services/local-storage.service";
import {LocalDAta} from "../../interfaces/local-data";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [MatTableModule, MatIconModule, NgClass, MatButtonModule, NgIf, DatePipe, MatPaginatorModule, MatCheckboxModule, FormsModule, NgForOf],
})
export class TableComponent implements OnInit {

  constructor(private http: HttpService,
              private data: DataService,
              private date: DatePipe,
              private local: LocalStorageService,
  ) {
  }

  dataSource = new MatTableDataSource<FinalUser>();
  displayedColumns: string[] = ['actions', 'name', 'email', 'phone', "is_admin", "update_at", "create_at", "status", "is_ecp"];
  sortedData: FinalUser[] = [];
  usersFinal: FinalUser[] = [];
  usersLocal: LocalDAta[] = this.local.getItem("users")
  selection = new SelectionModel<FinalUser>(true, []);
  selectedUsers: LocalDAta[] = []


  ngOnInit() {
    this.loadData();
    this.data.filters$.subscribe((filters: Filter) => {
      this.applyFilters(filters);
    })
    this.data.status$.subscribe(data => {
      this.dataSource.data.map(user => {
        data.forEach(u => {
          if (u.id === user.id && u.is_admin === user.is_admin) {
            user.status = u.status
          }
        })
      })
    })
    this.data.totalLength.set(this.dataSource.data.length)
  }

  showRecordsDefault: number = 10;
  showRecordsValue: number[] = [5, 10, 20]
  selectedRecords: number = 0;
  records: number = this.showRecordsDefault
  allRecords: number | null = null;


  loadData() {
    this.http.getData().subscribe((data: Data) => {
      this.mergeUsersData(data);
      this.usersToLocal();
      this.remapData();
      this.setDataSource(this.usersFinal);
      this.allRecords = this.usersFinal.length
    });
  }

  mergeUsersData(data: Data) {
    data.data.forEach((userData) => {
      data.users.forEach((user) => {
        if (user.id === userData.user_id) {
          this.usersFinal.push({...user, ...userData});
        }
      });
    });
  }

  remapData() {
    this.usersFinal.forEach((user) => {
      user.create_at = this.date.transform((Number(user.create_at) * 1000), "dd.MM.yyyy")
      user.update_at = this.date.transform(Number(user.update_at) * 1000, "dd.MM.yyyy")
    })
    if (this.usersLocal) {
      this.usersFinal.map(user => {
        this.usersLocal.forEach((u: any) => {
          if (u.id === user.id && u.is_admin === user.is_admin) {
            user.status = u.status
          }
        })
      })
    }
  }

  setDataSource(arr: FinalUser[]) {
    this.dataSource.data = arr
  }

  applyFilters(filters: Filter) {
    this.sortedData = this.usersFinal.filter(item => {
      const nameMatch = !filters.name || item.name === filters.name;
      const emailMatch = !filters.email || item.email.includes(filters.email);
      const phoneMatch = !filters.phone || item.phone === filters.phone;
      const isAdminMatch = filters.is_admin === "all" || item.is_admin === filters.is_admin;
      const updateAtMatch = !filters.update_at || item.update_at === filters.update_at;
      const createAtMatch = !filters.create_at || item.create_at === filters.create_at;
      const statusMatch = filters.status === "all" || item.status === filters.status;

      return nameMatch && emailMatch && phoneMatch && isAdminMatch && updateAtMatch && createAtMatch && statusMatch;
    });
    this.setDataSource(this.sortedData)
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }


  usersToLocal() {
    if (!this.usersLocal) {
      const users: {}[] = []
      this.usersFinal.forEach(user => {
        users.push({id: user.id, is_admin: user.is_admin, status: user.status})
      })
      this.local.setItem("users", users)
      console.log(this.local.getItem("users"), "in Local")
    }
  }

  selectUser(event: MatCheckboxChange, user: FinalUser) {
    if (event.checked) {
      this.selectedRecords += 1;
      this.selectedUsers.push({
        id: user.id,
        is_admin: user.is_admin,
        status: user.status
      })
    } else if (!event.checked) {
      this.selectedRecords -= 1;
      let idx = this.selectedUsers.findIndex((value: any) => value.id === user.id && value.is_admin === user.is_admin)
      this.selectedUsers.splice(idx, 1)
    }
    this.data.selectedUsers.set(this.selectedUsers)
    this.data.numberOfSelectedUser.set(this.selectedUsers.length)
  }

  selectAll(event: MatCheckboxChange) {
    if (event.checked) {
      this.selectedRecords = this.dataSource.data.length
      this.dataSource.data.forEach(user => {
        this.selectedUsers.push({
          id: user.id,
          is_admin: user.is_admin,
          status: user.status
        })
      })
    } else if (!event.checked) {
      this.selectedUsers = []
      this.selectedRecords = this.selectedUsers.length
    }
    this.data.selectedUsers.set(this.selectedUsers)
  }

}




