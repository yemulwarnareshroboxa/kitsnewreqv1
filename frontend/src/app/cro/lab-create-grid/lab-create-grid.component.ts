import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { CrosService } from '../cros.service';

@Component({
  selector: 'app-lab-create-grid',
  templateUrl: './lab-create-grid.component.html',
  styleUrls: ['./lab-create-grid.component.css']
})
export class LabCreateGridComponent implements OnInit {
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  croDetails: any[] = []
  page = 1;
  totalCount = 0
  pageSize = 10;
  isAscendingSort: boolean = true;
  isAscendingSort1: boolean = true;
  isAscendingSort2: boolean = true;

  p = 1;
  searchText: any
  allcroDetails: any;
  sortDirection: number = 1; // 1 for ascending, -1 for descending
  sortedColumn: string = '';
  sort(Column: string) {
    if (this.sortedColumn === Column)
    {
      this.sortDirection *= -1;
    }
    else(this.sortedColumn = Column)
    {
      this.sortDirection *= 1;
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
    private cro: CrosService,
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
  labCreate() {
    this.route.navigate(['/home/cro/createlabtest'])
  }
  edit(id: string, val: string) {
   
    this.route.navigate(['/home/cro/updatecLabTest', id, val])
  }
  toggleSorting() {
    this.isAscendingSort = !this.isAscendingSort;
    // Implement your sorting logic here based on the current sorting state.
  }
  toggleSorting1() {
    this.isAscendingSort = !this.isAscendingSort;
    // Implement your sorting logic here based on the current sorting state.
  }
  toggleSorting2() {
    this.isAscendingSort = !this.isAscendingSort;
    // Implement your sorting logic here based on the current sorting state.
  }
  getCRoDetails() {
    this.cro.getlabs().subscribe(
      (data: any) => {
        this.croDetails = data
        this.allcroDetails = data
        console.log(data)
        this.totalCount = this.croDetails.length
      },
      (err: any) => {
        this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
      }
    )
  }
}
