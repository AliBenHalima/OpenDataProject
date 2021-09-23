import { FormsService } from './../../../Services/forms.service';
import { QuestionService } from './../../../Services/question.service';
import { QuestionBase } from './../../../Utils/question-base';
import { Component, OnInit, Input, ViewChild, Output,EventEmitter } from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { QuestionControlService } from 'src/app/Services/question-control.service';
import * as data from '../../../Utils/jsonfiles/ElementTypes.json';
import { QuestionComponentComponent } from '../../question-component/question-component.component';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  index: any = 0;
  title="No title";
  options: any = (data as any).default;
  payLoad = '';
  QuestionsData:any=[]
  SelectedOption: any = this.options[0];

  constructor(
    private qcs: QuestionControlService,
    public fb: FormBuilder,
    public service: QuestionService,
    public FormsService : FormsService
  ) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
    this.QuestionsData.unshift({title: this.form.get('title').value})
  }

  getQuestion(newItem: any) {
    this.QuestionsData.push(newItem)
  }

  new(event) {
    console.log(event);
    if (event.target.nodeName != 'SPAN') return;
    console.log(this.SelectedOption);
    this.service.pushQuestion({
      answerType: this.SelectedOption.name,
      index: ++this.index,
    });
    let titlevalue=this.form.get('title').value;
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
    this.form.controls['title'].setValue(titlevalue);

    this.SelectedOption = this.options[0];
  }

  onSubmit() {
    this.QuestionsData[0]={title: this.form.get('title').value}
    this.FormsService.SaveForm(this.QuestionsData).subscribe((result)=>{
    })

  }
  countChangedHandler(count: number) {
 alert(count)
  }

  DeleteQuestion(key, i) {
    console.log("question inspect",this.questions);
    console.log(this.form);
    console.log(key);
    this.form.removeControl(key);
    this.form.updateValueAndValidity();
    this.questions.splice(i, 1);
    this.QuestionsData.splice(i, 1);
  }

  Change(event) {
    console.log(event.value.name);
    console.log('select', this.SelectedOption);
  }
  SaveOption(event) {
    alert('Clicked');
  }

  test() {
    return 2;
  }

  get() {
    console.log('Question', this.questions);
    console.log('Form', this.form);
  }
  OnKeyUp() {
    return;
  }
}
