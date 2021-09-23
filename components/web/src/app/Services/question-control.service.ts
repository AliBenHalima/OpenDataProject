import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from '../Utils/question-base';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions:any ) {
    const group: any = {};

    group["title"] =new FormControl('No title', Validators.required);
    group["formtype"] =new FormControl('informative', Validators.required);

    questions.forEach(question => {


      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
      : new FormControl(question.value || '');

    });

    return new FormGroup(group);
    // return group;
  }
}
