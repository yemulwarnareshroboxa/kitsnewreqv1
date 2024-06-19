import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  @Input() questions:any;

  public currentQuestionId = 0;
  public answers: number[] = [];
  public accessMentText:any;
  public accessmentDialog:boolean=false;
  public isQuizPass:boolean=false;
  constructor(private route: Router) { }

  public onAnswer(questionId: number, answerId: number) {
    this.answers[questionId] = answerId;
  }

  public next() {
    this.currentQuestionId++;
  }

  public prev() {
    this.currentQuestionId--;
  }

  assessment :any=[];
  public verify() {
    const res = this.questions.filter((q:any,i:any) => q.answerId === this.answers[i]).length;
  
   this.assessment=[];
   console.log(this.questions)
  //  for(var i=0;i<this.questions.length;i++){
  //   let result:any = {};
  //   result.Question = this.questions[i].title;
  //   result.CorrectAnswer=this.questions[i].options[this.questions[i].answerId];
  //   result.yourAns = this.questions[i].options[this.answers[i]]
  //   this.assessment.push(result)
  //  }
    this.questions.filter((q:any,i:any)=>{
      let result:any = {};
      result.Question = q.title;
      result.CorrectAnswer=q.options[q.answerId];
      result.yourAns = q.options[this.answers[i]]
      this.assessment.push(result)
    })
console.log(this.assessment)
 //  alert(`Your result is: ${res}/${this.questions.length}`)
    var pec = ((res/this.questions.length) * 100).toFixed(0);
     this.accessmentDialog=true;
    
    if(parseInt(pec)>=80){
      this.isQuizPass = true;
      let topicName = sessionStorage.getItem('topic')
      this.accessMentText='<u>Congratulations !!!!!</u></br></br> You have successfully completed the learning of '+topicName+' with '+pec+'%';
    }else{
      this.isQuizPass = false;
       this.accessMentText='<b>Better Luck Next Time !!!!</b>';
    }
  }

  accessmentStatus(){
    this.accessmentDialog = false;
    // alert(sessionStorage.getItem('userid'));
    // alert(this.isQuizPass)
    this.route.navigate(['/home/cro/dashboards'])
    
  }

  public isAnsweredAll() {
    const answersCount = this.answers.filter(() => true).length;
    return this.questions.length === answersCount;
  }

}