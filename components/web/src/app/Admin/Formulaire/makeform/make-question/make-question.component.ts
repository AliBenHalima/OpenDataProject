import { Component, OnInit, Input, Output,EventEmitter  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from 'src/app/Utils/question-base';
import * as  data  from  '../../../../Utils/jsonfiles/ElementTypes.json';

@Component({
  selector: 'app-make-question',
  templateUrl: './make-question.component.html',
  styleUrls: ['./make-question.component.scss']
})
export class MakeQuestionComponent implements OnInit {

  checked: boolean;
  dateValue:any
  // options:  any  = (data  as  any).default;
  Questionvalue="";
  InputValue:string="";
  // options=[
  //   {name:"textbox"},
  //   {name:"dropdown"},
  //   {name:"textarea"}
  // ]
  constructor() { }
  @Input() question!: any;
  SelectedOption:string="";
  @Input() inputs!: any;
  @Input() form!: FormGroup;
  @Output() newItemEvent = new EventEmitter<any>();

  // @Output() Data: EventEmitter<number> = new EventEmitter()

  get isValid() {  return this.form.controls[this.question.key].valid;}


  ngOnInit(): void {
    if(this.question.required==1){
      this.checked=true;
    }else{
      this.checked=false;
    }
    let input =  this.inputs.find(e=>e.label==this.question.label);
    this.SelectedOption=input.id
    // console.log("Json data options",this.inputs);

    // console.log("Selected Option of this question",this.SelectedOption);
    // console.log("form",this.form);
    // console.log("question test",this.question);


    this.newItemEvent.emit(this.question);
    // console.log(this.Change());
  }

  // addNewItem(){
  //   this.newItemEvent.emit(this.question);
  //   }

  Change(event){
    let input =  this.inputs.find(e=>e.id==event.value);

   this.question.type = input.type;
   this.question.label = input.label;
   this.question.key = input.id.toString();
   this.question.input_id = input.id.toString();
   this.question.input_type = input.textBoxtypes;

   if(this.question.type=="checkbox" || this.question.type=="dropdown"){
    this.question.options=input.options.split(',');
   }
   console.log(this.question);

  }

  changeValue(){
    this.question.value=this.Questionvalue;
  }

  AddOptions(option){
    if(this.InputValue=="") return ;
    console.log(this.InputValue);

    // console.log("current question",this.question);
    // let element= document.getElementById("")
    this.question.options.push({option:this.InputValue})
    this.InputValue=""
    // debugger;
    }

    SaveOption(event){
      if(event.target.value=="") return ;
      console.log("event",event);
      var currentTarget = event.currentTarget;
      this.question.options.push({option:event.target.value})
      let inputValue = (document.getElementById(event.target.id) as HTMLInputElement).value ="";

      // console.log("after add",this.question);
    }
    DeleteOption(index){
      this.question.options.splice(index,1)
    }

    toggleDisable(event){
      console.log(event);
      let element= document.getElementById(event.target.id)
      element.removeAttribute('disabled');
    }

    update(event,index){
      alert(index)

      if(event.target.value=="") return ;
      console.log(event.target.value);

      this.question.options[index]={option:event.target.value};
      // console.log(this.question,"qq");

      // debugger
      // document.getElementById(event.target.id).setAttribute('disabled', 'disabled');
    }

  ToggleRequired(event){
    this.question.required= event.checked;
    console.log(this.form);
  }

}
