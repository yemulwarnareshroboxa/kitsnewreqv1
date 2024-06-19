import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit {
  public getUserData: any;
  userDetails: any[] = [];
  isAscendingSort: boolean = true;
  isAscendingSort1: boolean = true;
  isAscendingSort2: boolean = true;

  searchText = ''
  allUserData: any;
  page = 1;
  totalCount = 0
  pageSize = 10;
  p = 1;
  sortedColumn: string = '';
  sortDirection: number = 1; // 1 for ascending, -1 for descending
  sort(column: string) {
    if (this.sortedColumn === column) {
      this.sortDirection *= -1;
    } else {
      this.sortedColumn = column;
      this.sortDirection = 1;
    }
  }
  compareValues(a: any, b: any) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  }
  constructor(private admin: AdminService, private route: Router ) {
    this.getUser()

  }
  
  

  ngOnInit(): void {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.userDetails = this.allUserData;
    } else {
      this.userDetails = this.allUserData.filter((user: any) => {
        const fullName = (user.first_name + ' ' + user.last_name).toLowerCase();
        return (
          fullName.includes(filterValue) ||
          user.role.toLowerCase().includes(filterValue) ||
          user.email.toLowerCase().includes(filterValue)
        );
      });
    }
  }
  
  pageChange(event: number) {
   this.page = event;
    this.getUser()
  }
  toggleSorting() {
    this.isAscendingSort = !this.isAscendingSort;
    // Implement your sorting logic here based on the current sorting state.
  }
  toggleSorting1() {
    this.isAscendingSort1 = !this.isAscendingSort1;
    // Implement your sorting logic here based on the current sorting state.
  }
  toggleSorting2() {
    this.isAscendingSort2 = !this.isAscendingSort2;
    // Implement your sorting logic here based on the current sorting state.
  }
  
  addUser() {
    this.route.navigate(['/home/admin/userCreate'])
  }
  edit(id: string, val: string) {
    this.route.navigate(['/home/admin/userUpdate', id, val])
  }
  getUser() {
    this.getUserData = this.admin.getUser().subscribe((data: any) => {
      this.userDetails = data
      this.allUserData = data
      this.totalCount = this.userDetails.length
    })

  }

}
