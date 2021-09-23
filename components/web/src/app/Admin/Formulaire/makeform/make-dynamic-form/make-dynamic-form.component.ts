import { MessageService } from 'primeng/api';
import { QuestionBase } from 'src/app/Utils/question-base';
import { QuestionService } from './../../../../Services/question.service';
import { FormsService } from 'src/app/Services/forms.service';
import { Component, OnInit, Input, ViewChild, Output,EventEmitter } from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { QuestionControlService } from 'src/app/Services/question-control.service';
import * as data from '../../../../Utils/jsonfiles/formtypes.json';
// import { QuestionComponentComponent } from '../../question-component/question-component.component';

@Component({
  selector: 'app-make-dynamic-form',
  templateUrl: './make-dynamic-form.component.html',
  styleUrls: ['./make-dynamic-form.component.scss']
})
export class MakeDynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<string>[] | null = [];
  @Input() SelectedSearchEtab: any;
  form!: FormGroup;
  index: any = 0;
  title="No title";
  Localrole=JSON.parse(localStorage.getItem('isSuperAdmin'));
  Localetablissement_id = +localStorage.getItem('etablissement_id');
  // options: any = (data as any).default;
  payLoad = '';
  QuestionsData:any=[]
  inputs:any=[]
  formtypes: any = (data as any).default;
  SelectedformType="";
  SelectedOption=[];
  SelectedInput:any=[];

  constructor(
    private qcs: QuestionControlService,
    public fb: FormBuilder,
    public service: QuestionService,
    public FormsService : FormsService,
    public messageService : MessageService
  ) {}

  ngOnInit() {


this.GetInputs();

    this.form = this.qcs.toFormGroup(this.questions);
console.log(this.form.value);
this.SelectedformType=this.form.get('formtype').value
    // this.form.addControl(
    //   'title',
    //   new FormControl('No title', Validators.required)
    // );
    this.QuestionsData.unshift({title: this.form.get('title').value})
    // this.form.get('title').setValue("no title");
 console.log(this.QuestionsData);


  }



  GetInputs(){
    this.FormsService.GetAllInputs().subscribe((result) => {
      console.log('inputs resulys are', result);
      this.inputs=result.inputs;
      this.SelectedOption=result.inputs[0]
      this.SelectedInput = this.inputs.find(e=>e.id== this.SelectedOption['id'])
      });
    }

  getQuestion(newItem: any) {
    this.QuestionsData.push(newItem)
    console.log("my questions",newItem);
  }




  new(event) {
    console.log("THIS QUESTOINS ARE ",this.questions);
    console.log(event);
    if (event.target.nodeName != 'SPAN') return;
    console.log("Selected option",this.SelectedOption);
    let OptionsArray =[]
    if(this.SelectedInput.options){
       OptionsArray = this.SelectedInput.options.split(',');
      }

    this.service.pushQuestion({
      input: this.SelectedInput,
      index: ++this.index,
      OptionsArray! : OptionsArray
    });
    console.log(this.questions,'ggggg');
console.log(this.form.value,"GGGGGG form");

    let titlevalue=this.form.get('title').value;
    this.form = this.qcs.toFormGroup(this.questions);
    this.form.controls['title'].setValue(titlevalue);

    // this.form.addControl(
    //   'title',
    //   new FormControl('No title', Validators.required)
    // );

    // this.SelectedOption = this.inputs[0];
    // this.SelectedInput = this.inputs.find(e=>e.id==this.SelectedOption['id']);

    this.SelectedOption = this.inputs[0].id;
    this.SelectedInput = this.inputs.find(e=>e.id==this.SelectedOption)

  }

  onSubmit() {
    console.log(this.QuestionsData);

    if(this.SelectedSearchEtab==null){
      alert("Please Select an Etablissement")
      return;
    }
    console.log("form",this.form.value);

    console.log("QuesData",this.QuestionsData);

    this.QuestionsData[0]={title: this.form.get('title').value,etablissement_id:this.SelectedSearchEtab,formtype:this.SelectedformType}
console.log("CHECK this",this.QuestionsData);

    this.FormsService.SaveFormulaire(this.QuestionsData).subscribe((result)=>{
      console.log("result",result);
      if (!result.success) {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: result.message,
        });
        return;
      }
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Form Saved',
      });
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
    this.QuestionsData.splice(i+1, 1);

    console.log('new form', this.form.value);
    console.log('NEW QuestionsData after Delete', this.QuestionsData);
  }

  Change(event) {
    this.SelectedInput = this.inputs.find(e=>e.id==event.value)

    console.log(event);
    console.log('select', this.SelectedInput);
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
