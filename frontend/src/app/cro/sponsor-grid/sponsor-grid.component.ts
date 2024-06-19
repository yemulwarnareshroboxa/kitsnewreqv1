import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrosService } from '../cros.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sponsor-grid',
  templateUrl: './sponsor-grid.component.html',
  styleUrls: ['./sponsor-grid.component.css']
})
export class SponsorGridComponent implements OnInit {
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  sponsorDetails: any[]= [];
  allsponsorDetails: any;
  page = 1;
  isAscendingSort: boolean = true;
  isAscendingSort1: boolean = true;
  isAscendingSort2: boolean = true;
  topSelling:any;
  totalCount = 0
  pageSize = 10;
  p = 1;
  searchText = ''
  sortedColumn: string = '';
  sortDirection: number = 1; // 1 for ascending, -1 for descending
  sampleImage:any;
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

  constructor(private route:Router, 
    private _cro:CrosService, private messageService: MessageService) { 
      this.sampleImage='assets/images/users/user1.jpg';
      this.topSelling=[

        {
            image: 'assets/images/users/user1.jpg',
            uname: 'Hanna Gover',
            gmail: 'hgover@gmail.com',
            productName: 'Flexy React',
            status: 'danger',
            weeks: 35,
            budget: '95K'
        },
        {
            image: 'assets/images/users/user2.jpg',
            uname: 'Hanna Gover',
            gmail: 'hgover@gmail.com',
            productName: 'Landing pro React',
            status: 'info',
            weeks: 35,
            budget: '95K'
        },
        {
            image: 'assets/images/users/user3.jpg',
            uname: 'Hanna Gover',
            gmail: 'hgover@gmail.com',
            productName: 'Elite React	',
            status: 'warning',
            weeks: 35,
            budget: '95K'
        },
        {
            image: 'assets/images/users/user4.jpg',
            uname: 'Hanna Gover',
            gmail: 'hgover@gmail.com',
            productName: 'Ample React',
            status: 'success',
            weeks: 35,
            budget: '95K'
        },
        {
          image: 'assets/images/users/user1.jpg',
          uname: 'Hanna Gover',
          gmail: 'hgover@gmail.com',
          productName: 'Flexy React',
          status: 'danger',
          weeks: 35,
          budget: '95K'
      },
      {
          image: 'assets/images/users/user2.jpg',
          uname: 'Hanna Gover',
          gmail: 'hgover@gmail.com',
          productName: 'Landing pro React',
          status: 'info',
          weeks: 35,
          budget: '95K'
      },
      {
          image: 'assets/images/users/user3.jpg',
          uname: 'Hanna Gover',
          gmail: 'hgover@gmail.com',
          productName: 'Elite React	',
          status: 'warning',
          weeks: 35,
          budget: '95K'
      },
      {
          image: 'assets/images/users/user4.jpg',
          uname: 'Hanna Gover',
          gmail: 'hgover@gmail.com',
          productName: 'Ample React',
          status: 'success',
          weeks: 35,
          budget: '95K'
      },
      {
        image: 'assets/images/users/user1.jpg',
        uname: 'Hanna Gover',
        gmail: 'hgover@gmail.com',
        productName: 'Flexy React',
        status: 'danger',
        weeks: 35,
        budget: '95K'
    },
    {
        image: 'assets/images/users/user2.jpg',
        uname: 'Hanna Gover',
        gmail: 'hgover@gmail.com',
        productName: 'Landing pro React',
        status: 'info',
        weeks: 35,
        budget: '95K'
    },
    {
        image: 'assets/images/users/user3.jpg',
        uname: 'Hanna Gover',
        gmail: 'hgover@gmail.com',
        productName: 'Elite React	',
        status: 'warning',
        weeks: 35,
        budget: '95K'
    },
    {
        image: 'assets/images/users/user4.jpg',
        uname: 'Hanna Gover',
        gmail: 'hgover@gmail.com',
        productName: 'Ample React',
        status: 'success',
        weeks: 35,
        budget: '95K'
    },
    {
      image: 'assets/images/users/user1.jpg',
      uname: 'Hanna Gover',
      gmail: 'hgover@gmail.com',
      productName: 'Flexy React',
      status: 'danger',
      weeks: 35,
      budget: '95K'
  },
  {
      image: 'assets/images/users/user2.jpg',
      uname: 'Hanna Gover',
      gmail: 'hgover@gmail.com',
      productName: 'Landing pro React',
      status: 'info',
      weeks: 35,
      budget: '95K'
  },
  {
      image: 'assets/images/users/user3.jpg',
      uname: 'Hanna Gover',
      gmail: 'hgover@gmail.com',
      productName: 'Elite React	',
      status: 'warning',
      weeks: 35,
      budget: '95K'
  },
  {
      image: 'assets/images/users/user4.jpg',
      uname: 'Hanna Gover',
      gmail: 'hgover@gmail.com',
      productName: 'Ample React',
      status: 'success',
      weeks: 35,
      budget: '95K'
  },
  {
    image: 'assets/images/users/user1.jpg',
    uname: 'Hanna Gover',
    gmail: 'hgover@gmail.com',
    productName: 'Flexy React',
    status: 'danger',
    weeks: 35,
    budget: '95K'
},
{
    image: 'assets/images/users/user2.jpg',
    uname: 'Hanna Gover',
    gmail: 'hgover@gmail.com',
    productName: 'Landing pro React',
    status: 'info',
    weeks: 35,
    budget: '95K'
},
{
    image: 'assets/images/users/user3.jpg',
    uname: 'Hanna Gover',
    gmail: 'hgover@gmail.com',
    productName: 'Elite React	',
    status: 'warning',
    weeks: 35,
    budget: '95K'
},
{
    image: 'assets/images/users/user4.jpg',
    uname: 'Hanna Gover',
    gmail: 'hgover@gmail.com',
    productName: 'Ample React',
    status: 'success',
    weeks: 35,
    budget: '95K'
}
      
      ]
    }


// Theme table




  ngOnInit(): void {
    this.getSponsorDetails()
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
  sponsorCreate(){
    this.route.navigate(['/home/cro/csponsor'])
  }
  edit(id:string, val: string){
    console.log(val)
    this.route.navigate(['/home/cro/csponsorUpdate',id, val])
  }
  getSponsorDetails(){
    this._cro.getsponsors().subscribe(
      (data:any)=>{
      this.sponsorDetails = data
      this.allsponsorDetails = data
       this.totalCount= this.sponsorDetails.length
      },
      (err:any)=>{
        this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
      }
    )
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.sponsorDetails = this.allsponsorDetails;
    }
    else {
      this.sponsorDetails = this.allsponsorDetails.filter(
        (sponsor: any) =>
          (sponsor.sponsor_code && sponsor.sponsor_code.toLowerCase().includes(filterValue)) ||
          (sponsor.sponsor_name && sponsor.sponsor_name.toLowerCase().includes(filterValue)) ||
          (sponsor.email && sponsor.email.toLowerCase().includes(filterValue))
      );
    }

  }
  pageChange(event: number) {
    this.page = event;
    this.getSponsorDetails()
  }
}
