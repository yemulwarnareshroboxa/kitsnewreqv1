import { Component, OnInit } from '@angular/core';
import { ProtocolService } from '../protocol-registration/protocol-registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-protocol-grid',
  templateUrl: './protocol-grid.component.html',
  styleUrls: ['./protocol-grid.component.css']
})
export class ProtocolGridComponent implements OnInit {
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  protocolDetails: any[]= [];
  allprotocolDetails: any[] = [];
  isAscendingSort: boolean = true;
  isAscendingSort1: boolean = true;

  page = 1;
  totalCount = 0
  pageSize = 10;
  p = 1;
  searchText= ''
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
 

  constructor(private route: Router, private protocol: ProtocolService) { }

  ngOnInit(): void {
  this.getProtocolDetails();
  }
  toggleSorting() {
    this.isAscendingSort = !this.isAscendingSort;
    // Implement your sorting logic here based on the current sorting state.
  }
  toggleSorting1() {
    this.isAscendingSort1 = !this.isAscendingSort1;
    // Implement your sorting logic here based on the current sorting state.
  }
  siteCreate(){
    this.route.navigate(['/home/cro/protocol'])
  }
  view(id:string){

    
    this.route.navigate(['/home/cro/protocolView',id, 'protocol'])
  }
  
  edit(id:string){
    this.route.navigate(['/home/cro/protocolUpdate',id])
  }
  pCreate(){
    this.route.navigate(['/home/cro/protocolRegistration'])
  }
  getProtocolDetails(){
   this.protocol.getProtocol().subscribe((data:any)=>{
      console.log(data)
      this.protocolDetails = data
      this.allprotocolDetails = data
      this.totalCount= this.protocolDetails.length
    })

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.protocolDetails = this.allprotocolDetails;
    }
    else {
      this.protocolDetails = this.allprotocolDetails.filter(
        (siteData: any) =>
          (siteData.protocol_id && siteData.protocol_id.toLowerCase().includes(filterValue)) ||
          (siteData.protocol_name && siteData.protocol_name.toLowerCase().includes(filterValue)) ||
          (siteData.email && siteData.email.toLowerCase().includes(filterValue))
      );
    }
  }
  pageChange(event: number) {
    this.page = event;
    this.getProtocolDetails()
  }
}
