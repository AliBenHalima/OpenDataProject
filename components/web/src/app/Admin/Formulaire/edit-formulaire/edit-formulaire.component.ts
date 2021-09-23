import { FormBuilder, FormGroup } from '@angular/forms';
import { EtablissementService } from 'src/app/Services/etablissement.service';
import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from 'src/app/Services/question.service';
import { QuestionBase } from 'src/app/Utils/question-base';
import * as data from '../../../Utils/jsonfiles/formtypes.json';
import { QuestionControlService } from 'src/app/Services/question-control.service';
import { FormsService } from 'src/app/Services/forms.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-formulaire',
  templateUrl: './edit-formulaire.component.html',
  styleUrls: ['./edit-formulaire.component.scss']
})
export class EditFormulaireComponent implements OnInit {

  @Input() questions: QuestionBase<string>[] | null = [];
  @Input() SelectedSearchEtab: any;
  @Input() formulaireId: any;

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
  tentatives;
  formulaire;

  constructor(
    private qcs: QuestionControlService,
    public fb: FormBuilder,
    public service: QuestionService,
    public FormsService : FormsService,
    public messageService : MessageService
  ) {}

  ngOnInit() {

this.GetInputs();
this.GetFormulaireFullData();

    this.form = this.qcs.toFormGroup(this.questions);
console.log(this.form.value);
this.SelectedformType=this.form.get('formtype').value

    this.QuestionsData.unshift({title: this.form.get('title').value})
 console.log(this.QuestionsData);


  }

  GetFormulaireFullData(){
    this.FormsService.GetFormulaireFullData(this.formulaireId).subscribe((result)=>{
      console.log("result",result);
      this.tentatives = result.tentatives
      this.formulaire= result.formulaire

      this.SelectedformType=this.formulaire.formtype;
      this.SelectedSearchEtab=this.formulaire.etablissement_id;


      this.formulaire.inputs.forEach(element => {
        let OptionsArray =[];
        if(element.options){
          OptionsArray = element.options.split(',');
         }
         this.service.PushEditQuestions({
          input: element,
          required: element.pivot.required,
          index: ++this.index,
          OptionsArray! : OptionsArray
        });
      });
      console.log("Question required",this.questions);

      let titlevalue=this.formulaire.designation;
      this.form = this.qcs.toFormGroup(this.questions);
      this.form.controls['title'].setValue(titlevalue);

    })
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

    console.log(event);
    if (event.target.nodeName != 'SPAN') return;
    console.log(this.SelectedOption);
    let OptionsArray =[]
    if(this.SelectedInput.options){
       OptionsArray = this.SelectedInput.options.split(',');
      }

    this.service.pushQuestion({
      input: this.SelectedInput,
      index: ++this.index,
      OptionsArray! : OptionsArray
    });
    console.log("Question test",this.questions);

    let titlevalue=this.form.get('title').value;
    this.form = this.qcs.toFormGroup(this.questions);
    this.form.controls['title'].setValue(titlevalue);

    this.SelectedOption = this.inputs[0].id;
    this.SelectedInput = this.inputs.find(e=>e.id==this.SelectedOption)
  }

  onSubmit() {
    if(this.SelectedSearchEtab==null){
      alert("Please Select an Etablissement")
      return;
    }
    console.log("form",this.form.value);

    console.log("QuesData",this.QuestionsData);

    this.QuestionsData[0]={title: this.form.get('title').value,etablissement_id:this.SelectedSearchEtab,formtype:this.SelectedformType}
console.log("CHECK this",this.QuestionsData);

    this.FormsService.UpdateFormulaire(this.formulaireId,this.QuestionsData).subscribe((result)=>{
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
        detail: 'Form Updated',
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

    console.log('new form', this.form);
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

