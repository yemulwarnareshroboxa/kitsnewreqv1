import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.css']
})
export class QuizItemComponent {
  @Output() answer = new EventEmitter<number>();
  @Input() question:any;
  @Input() checkedIndex:any;

  public onChange(answerId: number) {
    this.answer.emit(answerId);
  }

}