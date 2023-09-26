import {Component} from '@angular/core';
import {DataService} from "../../services/data.service";
import {LocalStorageService} from "../../services/local-storage.service";

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
  usersToCahngeStatus = this.dataService.usersToChange

  blockUser() {
    let localUsers = this.localStorage.getItem("users")

    console.log(this.selectedUsers(), "block")
    console.log(localUsers, "Localblock")
    localUsers.map((user: any) => {
      this.selectedUsers().forEach((u: any) => {
        if (user.id === u.id && user.is_admin == u.is_admin) {
          user.status = "BLOCKED"
          this.usersToCahngeStatus().push(user)
        }
      })
    })
    console.log("afterBlock", localUsers)
    this.localStorage.setItem("users", localUsers)

  }

  unblockUser() {
    let localUsers = this.localStorage.getItem("users")


    console.log(this.selectedUsers(), "unblock")
    localUsers.map((user: any) => {
      this.selectedUsers().forEach((u: any) => {
        if (user.id === u.id && user.is_admin == u.is_admin) {
          user.status = "ACTIVE"
        }
      })
    })
    console.log("afterBlock", localUsers)
    this.localStorage.setItem("users", localUsers)
  }

  clearLocal() {
    localStorage.clear()
  }

}
