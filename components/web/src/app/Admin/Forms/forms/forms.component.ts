import { QuestionService } from './../../../Services/question.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionBase } from 'src/app/Utils/question-base';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  providers:  [QuestionService]
})
export class FormsComponent implements OnInit {
n=0

  questions$: Observable<QuestionBase<any>[]>;

  constructor(public service: QuestionService) {
    this.questions$ = service.getQuestions();
   this.questions$.subscribe(res=>console.log("questions",res));
  }


  ngOnInit(): void {
  }

  new(){

  }

}
