import { FormGroup } from '@angular/forms';
import { TextboxQuestion } from './../Utils/question-textbox';
import { DropdownQuestion } from './../Utils/question-dropdown';
import { QuestionBase } from './../Utils/question-base';
import { Injectable } from '@angular/core';


import { of } from 'rxjs';

@Injectable()
export class QuestionService {
  public questions:any=[
    // new TextboxQuestion({
    //   key: 'title',
    //   label: 'title',
    //   value: 'No title',
    //   required: true,
    //   order: 1
    // }),
  ]

  // TODO: get from a remote source of question metadata
  getQuestions() {
    return of(this.questions.sort((a, b) => a.order - b.order));
  }

  pushQuestion(Options){
    console.log("OPtion",Options);
           this.questions.push(
          {
             key: `${Options.input.id}`,
             label: `${Options.input.label}`,
             type: `${Options.input.type}`,
             input_id : `${Options.input.id}`,
            input_type : `${Options.input.textBoxtypes}`,
             options: Options.OptionsArray,
             required: false,
         })
  }

  PushEditQuestions(Options){
           this.questions.push(
          {
             key: `${Options.input.id}`,
             label: `${Options.input.label}`,
             type: `${Options.input.type}`,
             input_id : `${Options.input.id}`,
            input_type : `${Options.input.textBoxtypes}`,
             options: Options.OptionsArray,
             required: `${Options.required}`
         })
  }

}
