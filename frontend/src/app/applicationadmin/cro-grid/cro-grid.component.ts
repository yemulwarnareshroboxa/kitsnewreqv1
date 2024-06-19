import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { MessageService } from 'primeng/api';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-cro-grid',
  templateUrl: './cro-grid.component.html',
  styleUrls: ['./cro-grid.component.css']
})
export class CroGridComponent implements OnInit {
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  croDetails: any[] = []
  page = 1;
  totalCount = 0
  pageSize = 10;
  p = 1;
  searchText: any
  isAscendingSort: boolean = true;
  isAscendingSort1: boolean = true;
  isAscendingSort2: boolean = true;



  isMenuOpen: boolean = false;



  allcroDetails: any;
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
  constructor(private route: Router,
    private admin: AdminService,
    private messageService: MessageService) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.croDetails = this.allcroDetails;
    }
    else {
      this.croDetails = this.allcroDetails.filter(
        (cro: any) =>
          (cro.cro_code && cro.cro_code.toLowerCase().includes(filterValue)) ||
          (cro.cro_name && cro.cro_name.toLowerCase().includes(filterValue)) ||
          (cro.legal_cro_name && cro.legal_cro_name.toLowerCase().includes(filterValue))
      );
    }

  }
  pageChange(event: number) {
    this.page = event;
    this.getCRoDetails()
  }


  ngOnInit(): void {
    this.getCRoDetails();
  }
  croCreate() {
    this.route.navigate(['/home/admin/croCreate'])
  }
  toggleSorting() {
    this.isAscendingSort = !this.isAscendingSort;
    // Implement your sorting logic here based on the current sorting state.
  }
  toggleSorting1(){
    this.isAscendingSort1 = !this.isAscendingSort1;
  }

  toggleSorting2(){
    this.isAscendingSort2 = !this.isAscendingSort2;
  }
  



  

  
  edit(id: string, val: string) {
    this.route.navigate(['/home/admin/croUpdate', id, val])
  }
  getCRoDetails() {
    this.admin.getCro().subscribe(
      (data: any) => {
        this.croDetails = data.body
        this.allcroDetails = data.body
        console.log(data.body)
        this.totalCount = this.croDetails.length
      },
      (err: any) => {
        this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
      }
    )
  }
}
