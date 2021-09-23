import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/Services/forms.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-show-formulaire',
  templateUrl: './show-formulaire.component.html',
  styleUrls: ['./show-formulaire.component.scss']
})
export class ShowFormulaireComponent implements OnInit {

  constructor(
    public FormsService : FormsService, private _route: ActivatedRoute,public messageService: MessageService
  ) { }
  questions=[]
  FormData:any
  form:any;
  formulaire_id:any;
  selectedRadio=""
  uploadedFiles=[]
  Selectedfile:any
  FormDataSubmit = new FormData();
  selectedValues: string[] = [];

  ngOnInit(): void {
    this._route.params.subscribe(routeParams => {
      this.formulaire_id = routeParams.formulaire;
      })

    this.form = new FormGroup({
    });

    console.log(this.form.value);
    this.FormsService.GetFormulaireById(this.formulaire_id).subscribe((result)=>{
      console.log("result",result);
      this.FormData = result.formulaire

      this.FormData.inputs.forEach(e=>{
        e.pivot.required==1 ?
          this.form.addControl(e.pivot.id, new FormControl('', Validators.required))
          :
          this.form.addControl(e.pivot.id, new FormControl(''));
    })


  })


  }

  onSubmit(){
    // console.log(this.form);
    // return;
 console.log(this.form.value);
    this.FormData.inputs.forEach(e=>{
      this.FormDataSubmit.append(e.pivot.id, this.form.get(e.pivot.id.toString()).value);
  })

  this.FormsService.SaveFormRequest(this.FormDataSubmit).subscribe((result) => {
    console.log('Result of saving Form request', result);
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
    });
  }

  onSelect(event,controlname) {
    console.log(event);
    this.uploadedFiles.push(event.currentFiles[0]);
    this.Selectedfile =event.currentFiles[0];
    console.log(this.Selectedfile);
    console.log(this.form);
    this.form.controls[controlname].setValue(this.Selectedfile);
}

test(event,opt,id){
  console.log("ezaea",event.target.value);
}

}
