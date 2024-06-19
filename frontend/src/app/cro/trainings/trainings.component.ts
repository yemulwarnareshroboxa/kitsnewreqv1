import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrosService } from '../cros.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  breadcrumb: string = 'Lab Test';
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  
  LabDetails: any[] = [];
  allLabDetails: any;
  materials: any[] = [];
  allmaterials: any;
  page = 1;
  pageM =1;
  totalCount = 0
  pageSize = 10;
  pageSizeM = 10;
  p = 1;
  searchText = '';
  searchTextm = '';
  lab: boolean = true;
  isAccessmentStart: boolean = false;
 
  disablefields: boolean = false;
  isCellBiologyClicked: boolean = false;
  dnaContent: boolean = false;
  isCardShow: boolean = true;
 
  role: any;

  private capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }


 

  questions = [
    {
        title: 'The Cell Theory states that:',
        options: [
            'a) All living things are made of cells and cells are the basic unit of life.',
            'b) All cells arise from pre-existing cells.',
            'c) Both a and b',
            'd) Cells spontaneously generate from non-living matter.'
        ],
        answerId: 0,
    },
    {
        title: 'The cell membrane is composed mainly of:',
        options: [
            'a) Proteins and carbohydrates',
            'b) Lipids and proteins',
            'c) Nucleic acids and proteins',
            'd) Sugars and fats',
        ],
        answerId: 1,
    },
    {
        title: 'The jelly-like substance within the cell that contains organelles is called the:',
        options: [
            'a) Nucleus',
            'b) Cytoplasm',
            'c) Cell wall (plant cells only)',
            'd) Golgi apparatus',
        ],
        answerId: 1,
    },
    {
        title: 'The genetic material (DNA) is found inside the:',
        options: [
            'a) Ribosomes',
            'b) Mitochondria',
            'c) Nucleus',
            'd) Cytoplasm',
        ],
        answerId: 2,
    },
    {
        title: 'Which of the following organelles is responsible for protein synthesis?',
        options: [
            'a) Lysosome',
            'b) Golgi apparatus',
            'c) Ribosome',
            'd) Endoplasmic reticulum',
        ],
        answerId: 2,
    },
    {
        title: 'Rough Endoplasmic Reticulum (RER) is distinguished from Smooth ER by the presence of:',
        options: [
            'a) More lipids',
            'b) Ribosomes attached to its surface',
            'c) Larger size',
            'd) No significant difference',
        ],
        answerId: 1,
    },
    {
        title: 'The Golgi apparatus is responsible for:',
        options: [
            'a) Cellular respiration',
            'b) Protein synthesis',
            'c) Modifying, sorting, and packaging molecules',
            'd) Breaking down waste materials',
        ],
        answerId: 2,
    },
    {
        title: 'Lysosomes are known as the cells',
        options: [
            'a) Powerhouse',
            'b) Digestive system',
            'c) Transportation network',
            'd) Building blocks',
        ],
        answerId: 1,
    },
    {
        title: 'Which organelle is responsible for generating most of the cells energy (ATP)?',
        options: [
            'a) Ribosome',
            'b) Mitochondria',
            'c) Golgi apparatus',
            'd) Lysosome',
        ],
        answerId: 1,
    },
    {
        title: 'Prokaryotic cells differ from eukaryotic cells by lacking a/an:',
        options: [
            'a) Cell membrane',
            'b) Cytoplasm',
            'c) Nucleus and membrane-bound organelles',
            'd) Cell wall (plant cells only)',
        ],
        answerId: 2,
    }
];

public currentQuestionId = 0;
  public answers: number[] = [];

  public onAnswer(questionId: number, answerId: number) {
    this.answers[questionId] = answerId;
  }

  public next() {
    this.currentQuestionId++;
  }

  public prev() {
    this.currentQuestionId--;
  }

  public verify() {
    const res = this.questions.filter((q, i) => q.answerId === this.answers[i]).length;
   // alert(`Your result is: ${res}/${this.questions.length}`)
    let pec = ((res/this.questions.length) * 100).toFixed(0);
      
     let pec1 = ''+pec;

    alert(pec+'%');
    if(pec == '80'){
      alert('Congratulations! You have successfully completed the learning with '+pec+'%')
    }else{
        alert("Better Luck Next Time !!!!")
    }

    
  }

  public isAnsweredAll() {
    const answersCount = this.answers.filter(() => true).length;
    return this.questions.length === answersCount;
  }
  
  material: boolean = false;
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
 
  public labForm: FormGroup = new FormGroup({
    lab_test: new FormControl("", [Validators.required]),
    classification: new FormControl("")
  })
  // disableaddbtn: boolean = true
  // labFormval: boolean = false;
  // isAscendingSort: boolean = true;
  // isAscendingSort1: boolean = true;
  // isAscendingSort2: boolean = true;
  // disableAdd: boolean = true
  // totalCountmaterial = 0;
  // selectedIndex = 0;
  // classifications = ['Select Classification','Classification 1', 'Classification 2'];
  constructor(private route: Router, private _cro: CrosService,
    private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    // this.labDetailsData();
    // this.meterialsData()
    // if (sessionStorage.getItem('tab') === 'yes') {
    //   this.yes();
    // }
    // else {
    //   this.selectedIndex = 0;
    //   sessionStorage.setItem('tab', '');
    // }
    this.role = sessionStorage.getItem('role')
   
     if (this.role === 'CRO') {
      this.disablefields = true;
 
 
    }

  }

  getCellBiologyContent(){
    sessionStorage.setItem('isTrainingClicked','true')
    this.isCardShow=false;
    this.isCellBiologyClicked =  true;
    this.dnaContent = false;
   //this.router.navigate(['/trainings-cell-biology'])
  }

  getDNAContent(){
    sessionStorage.setItem('isTrainingClicked','true')
    this.isCardShow=false;
    this.isCellBiologyClicked =  false;
    this.dnaContent = true;
  }

  yes() {
    // if (this.selectedIndex === 0) {

    //   this.selectedIndex = this.selectedIndex + 1;
    //   this.meterialsData()
    //   this.breadcrumb = 'Material'
    // }

    // sessionStorage.setItem('tab', '');
  }
  showLab() {
    this.lab = true
    this.material = false
  }
  toggleSorting() {
   // this.isAscendingSort = !this.isAscendingSort;
    // Implement your sorting logic here based on the current sorting state.
  }
  toggleSorting1() {
  //  this.isAscendingSort1 = !this.isAscendingSort1;
    // Implement your sorting logic here based on the current sorting state.
  }
  toggleSorting2() {
  //  this.isAscendingSort2 = !this.isAscendingSort2;
    // Implement your sorting logic here based on the current sorting state.
  }
  showMat() {
    this.lab = false
    this.material = true
  }
  
  edit(id: any, val: any) {
    this.route.navigate(['/home/cro/updateLabTest', id, val])
  }
  materialCreate() {
    this.route.navigate(['/home/cro/createLabTest'])

  }
 
  labCreate() {
    // this.route.navigate(['/home/cro/createlabtest'])
    // this.labFormval = true
    // this.disableAdd = false
    // this.disableaddbtn = false

  }
  labDetailsData() {
    this._cro.getLabTests().subscribe((data: any) => {
      this.LabDetails = data
      this.allLabDetails = data
      this.totalCount = this.LabDetails.length
    })
  }
  onTabChange(event: any) {
   
    if(event.index === 0){
      this.breadcrumb = 'Lab Test'
    }
    else{
      this.breadcrumb = 'Material'
    }
  }
  
  meterialsData() {
    this._cro.meterials().subscribe((data: any) => {
      this.materials = data
      this.allmaterials = data
     // this.totalCountmaterial = this.materials.length
    })
  }
  confirm2(id: any, name: any) {
    this.confirmationService.confirm({
    
        message: `Are you sure you want to delete the Lab Test '${name}'?`,
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.deletelab(id)
        },
        reject: (type: any) => {
            // switch(type) {
            //     case ConfirmEventType.REJECT:
            //         this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
            //     break;
            //     case ConfirmEventType.CANCEL:
            //         this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
            //     break;
            // }
        }
    });
}
  pageChangem(event: number) {
    this.pageM = event;
    this.meterialsData()

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.LabDetails = this.allLabDetails;
    }
    else {
      this.LabDetails = this.allLabDetails.filter(
        (labDetails: any) =>
          (labDetails.name && labDetails.name.toLowerCase().includes(filterValue)) ||
          (labDetails.classfication && labDetails.classfication.toLowerCase().includes(filterValue)) 
          // (labDetails.size && labDetails.size.toLowerCase().includes(filterValue))
      );
    }
  }
  applyFilterm(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.materials = this.allmaterials;
    }
    else {
      this.materials = this.allmaterials.filter(
        (labDetails: any) =>
          (labDetails.name && labDetails.name.toLowerCase().includes(filterValue)) ||
          (labDetails.size && labDetails.size.includes(filterValue)) 
          // (labDetails.size && labDetails.size.toLowerCase().includes(filterValue))
      );
    }
  }
  submit() {
    this.labForm.controls['lab_test'].setValue(this.capitalizeFirstLetter(this.labForm.controls['lab_test'].value));
    if (this.labForm.invalid) {
      // Mark all form controls as touched to trigger validation
      Object.keys(this.labForm.controls).forEach(key => {
        this.labForm.get(key)?.markAsTouched();
      });
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Enter Lab Test' });
    }
    else {
      const data: any =
      {
        "name": this.labForm.get('lab_test')?.value,
        "classfication": this.labForm.get('classification')?.value,
        "created_by": sessionStorage.getItem('userid')
      }
      this._cro.createTestDetails(data).subscribe(
        (data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Lab Test Results Added Successfully' });
          this.labForm.reset()
          if (this.route.url === '/home/cro/labTestGrid') {
            this.route.navigate(['/home/cro/labTestGrid'])
            this.labDetailsData()
          }
          else {
            this.route.navigate(['/home/cro/labTestgrid'])
            this.labDetailsData()
          }
          // this.labFormval = false
          // this.disableAdd = true
          // this.disableaddbtn = true
          this.searchText =''
        },
        (err: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });


        }
      );
    }

  }
  deletelab(id: any) {
    this._cro.deleteLab(id).subscribe(
      (data: any) => {
        console.log(data)
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Test Results Deleted Successfully' });
        this.labDetailsData()
      });

  }
  pageChange(event: number) {
    this.page = event;
    this.labDetailsData()
  }

}
