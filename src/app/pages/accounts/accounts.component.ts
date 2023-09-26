import {Component} from '@angular/core';
import {DataService} from "../../services/data.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {LocalDAta} from "../../interfaces/local-data";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  filter = this.dataService.controlFilter;

  constructor(private dataService: DataService, private localStorage: LocalStorageService) {
  }

  controlFilter() {
    if (this.filter()) {
      this.dataService.controlFilter.set(false)
    } else this.dataService.controlFilter.set(true)
  }

  selectedUsers = this.dataService.selectedUsers
  usersToChangeStatus = this.dataService.usersToChange

  blockUser() {
    let localUsers = this.localStorage.getItem("users")

    localUsers.map((user: LocalDAta) => {
      this.selectedUsers().forEach((u: LocalDAta) => {
        if (user.id === u.id && user.is_admin == u.is_admin) {
          user.status = "BLOCKED"
          this.usersToChangeStatus().push(user)
        }
      })
    })
    this.localStorage.setItem("users", localUsers)
    this.dataService.changeStatus(localUsers)
  }

  unblockUser() {
    let localUsers = this.localStorage.getItem("users")
    localUsers.map((user: any) => {
      this.selectedUsers().forEach((u: any) => {
        if (user.id === u.id && user.is_admin == u.is_admin) {
          user.status = "ACTIVE"
        }
      })
    })
    this.localStorage.setItem("users", localUsers)
    this.dataService.changeStatus(localUsers)
  }

  clearLocal() {
    localStorage.clear()
  }
}
