import { Component, OnInit } from '@angular/core';
import { CellBiologyService } from '../cell-biology.service';
import { interval, Subscription } from 'rxjs';
 
@Component({
  selector: 'app-trainings-dna-genetics',
  templateUrl: './trainings-dna-genetics.component.html',
  styleUrls: ['./trainings-dna-genetics.component.css']
})
export class TrainingsDnaGeneticsComponent implements OnInit {
 
  currentPage: number = 1;
  totalPages: number = 5;
  showIntroduction: boolean = true;
  isAccessmentStart: boolean = false;
 
  data: any = {
    introductions: []
  };
 
  questions = [
    // Add the questions array here as shown previously
  ];
 
  private timerSubscription!: Subscription;
  remainingTime: number = 1800; // 30 minutes in seconds
  showWarning: boolean = false;
 
  // data: any = {
  //   introductions: [
  //     {
  //       page: 1,
  //       title: "Introduction to DNA Genetics",
  //       content: [
  //         "Definition of a cell and its importance as the basic unit of life.",
  //         "The history of cell discovery by Robert Hooke and Anton van Leeuwenhoek.",
  //         "The Cell Theory and its two main tenets."
  //       ]
  //     },
  //     {
  //       page: 2,
  //       title: "Components of a Cell",
  //       content: [
  //         "Cell Membrane:",
  //         "Structure and function of the phospholipid bilayer.",
  //         "Selective permeability and the role of transport proteins.",
  //         "Cytoplasm:",
  //         "Composition and functions of the cytosol and organelles."
  //       ]
  //     },
  //     {
  //       page: 3,
  //       title: "Major Cell Organelles",
  //       content: [
  //         "Nucleus:",
  //         "Structure and function of the nucleus, including the nuclear envelope and nucleolus.",
  //         "Importance of DNA and RNA in the nucleus.",
  //         "Endoplasmic Reticulum (ER):",
  //         "Rough ER and its role in protein synthesis.",
  //         "Smooth ER and its diverse functions.",
  //         "Ribosomes:",
  //         "Structure and function of ribosomes in protein synthesis."
  //       ]
  //     },
  //     {
  //       page: 4,
  //       title: "Other Organelles and Cell Inclusions",
  //       content: [
  //         "Golgi Apparatus:",
  //         "Structure and function of the Golgi apparatus in protein modification, sorting, and packaging.",
  //         "Lysosomes:",
  //         "Structure and function of lysosomes as the cell's digestive system.",
  //         "Mitochondria:",
  //         "Structure and function of mitochondria in cellular respiration and ATP production.",
  //         "Cytoskeleton:",
  //         "Microtubules, microfilaments, and intermediate filaments: structure and functions in cell shape, movement, and division.",
  //         "Cell Wall (Plant Cells Only):",
  //         "Structure and function of the cell wall in plants."
  //       ]
  //     },
  //     {
  //       page: 5,
  //       title: "Prokaryotic vs. Eukaryotic Cells",
  //       content: [
  //         "Key differences between prokaryotic cells (bacteria and archaea) and eukaryotic cells (plants, animals, fungi, and protists).",
  //         "Examples of prokaryotic and eukaryotic organisms."
  //       ]
  //     }
  //   ]
  // };
 
  constructor( private cellBiologyService: CellBiologyService) { }
 
  ngOnInit(): void {
    // this.totalPages = this.data.introductions.length;
    this.getDnaGeneticsData();
  }
 
  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
 
  getDnaGeneticsData() {
    sessionStorage.setItem('topic','DNA Genetics');
    this.cellBiologyService.getDnaGeneticsData().subscribe(
      (data: any) => {
        this.data.introductions = data.map((item: any, index: number) => ({
          page: index + 1,
          title: item.main_title,
          content: item.content_detail.split('\n') // Assuming content_detail is a string with newline-separated content
        }));
        this.totalPages = this.data.introductions.length;
      },
      (err: any) => {
        console.error('Error fetching cell biology data:', err);
      }
    );
  }
 
 
  get progress(): number {
    return (this.currentPage / this.totalPages) * 100;
  }
 
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
 
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
 
  startAccessment() {
    this.cellBiologyService.getDnaGeneticsAccessmentData(2).subscribe((data: any) => {
      this.questions = data;
      this.isAccessmentStart = true;
      this.startTimer()
    });
   
  }
 
  startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.remainingTime--;
      if (this.remainingTime <= 300) {
        this.showWarning = true;
      }
      if (this.remainingTime === 0) {
        this.timerSubscription.unsubscribe();
        // Handle the timer end logic here
      }
    });
  }
 
  get formattedTime(): string {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
 
 
//   questions = [
//     {
//         title: 'DNA is the genetic material because it:',
//         options: [
//             'a) Stores and transmits hereditary information.',
//             'b) Forms the cell membrane.',
//             'c) Provides energy for the cell.',
//             'd) Breaks down waste materials.'
//         ],
//         answerId: 0,
//     },
//     {
//         title: 'The cell membrane is composed mainly of:',
//         options: [
//             'a) Proteins and carbohydrates',
//             'b) Lipids and proteins',
//             'c) Nucleic acids and proteins',
//             'd) Sugars and fats',
//         ],
//         answerId: 1,
//     },
//     {
//         title: 'The jelly-like substance within the cell that contains organelles is called the:',
//         options: [
//             'a) Nucleus',
//             'b) Cytoplasm',
//             'c) Cell wall (plant cells only)',
//             'd) Golgi apparatus',
//         ],
//         answerId: 1,
//     },
//     {
//         title: 'The genetic material (DNA) is found inside the:',
//         options: [
//             'a) Ribosomes',
//             'b) Mitochondria',
//             'c) Nucleus',
//             'd) Cytoplasm',
//         ],
//         answerId: 2,
//     }
   
// ];
 
}
 