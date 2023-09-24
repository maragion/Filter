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
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [MatTableModule, MatIconModule, NgClass, MatButtonModule, NgIf, DatePipe, MatPaginatorModule, MatCheckboxModule],
})
export class TableComponent implements OnInit {

  constructor(private http: HttpService, private data: DataService, private date: DatePipe) {
  }

  dataSource = new MatTableDataSource<FinalUser>();

  sortedData: FinalUser[] = [];
  usersFinal: FinalUser[] = [];


  ngOnInit() {
    this.loadData();


    this.data.filters$.subscribe((filters: Filter) => {
      this.applyFilters(filters);
    })
  }


  loadData() {
    this.http.getData().subscribe((data: Data) => {
      this.mergeUsersData(data);
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
    this.usersFinal.forEach((user) => {
      user.create_at = this.date.transform((Number(user.create_at) * 1000), "dd.MM.yyyy")
      user.update_at = this.date.transform(Number(user.update_at) * 1000, "dd.MM.yyyy")
    })
    this.dataSource = new MatTableDataSource(this.usersFinal);
    console.log(this.usersFinal);
  }

  applyFilters(filters: Filter) {
    this.sortedData = this.usersFinal.filter((item) => {
      return (
        (!filters.name || item.name === filters.name)
        &&
        (!filters.email || item.email.includes(filters.email))
        &&
        (!filters.phone || item.phone === (filters.phone))
        &&
        (filters.is_admin === "all" || item.is_admin === filters.is_admin)
        &&
        (!filters.update_at || item.update_at === filters.update_at)
        &&
        (!filters.create_at || item.create_at === filters.create_at)
        &&
        (filters.status === "all" || item.status === (filters.status))
      );
    });
    this.dataSource.data = this.sortedData;
    console.log("applyFilters", this.sortedData, filters)
  }


  displayedColumns: string[] = ['actions', 'name', 'email', 'phone', "is_admin", "update_at", "create_at", "status", "is_ecp"];



  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(user?: FinalUser[]): string {
    if (!user) {
      // console.log("row", row)
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    // console.log(user, "хуюзер")
    return `${this.selection.isSelected(user) ? 'deselect' : 'select'} row ${user}`;
  }
}




