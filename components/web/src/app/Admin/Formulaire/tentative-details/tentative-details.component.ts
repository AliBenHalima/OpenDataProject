import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/Services/forms.service';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tentative-details',
  templateUrl: './tentative-details.component.html',
  styleUrls: ['./tentative-details.component.scss']
})
export class TentativeDetailsComponent implements OnInit {


  constructor(
    public FormsService : FormsService, private _route: ActivatedRoute,private _location: Location,private messageService : MessageService) { }
  questions=[]
  FormData:any
  form:any;
  tentative_id:any;
  tentative:any;

  ngOnInit(): void {
    this._route.params.subscribe(routeParams => {
      this.tentative_id = routeParams.tentative;
      })

    // this.form = new FormGroup({
    // });


    this.FormsService.GetTentativeById(this.tentative_id).subscribe((result)=>{
      console.log("result",result);
      this.FormData = result.formulaire
      this.tentative =result.tentative;

    //   this.FormData.inputs.forEach(e=>{
    //     e.pivot.required==1 ?
    //       this.form.addControl(e.pivot.id, new FormControl('', Validators.required))
    //       :
    //       this.form.addControl(e.pivot.id, new FormControl(''));
    // })

  })


  }

  onSubmit(){
 this.FormsService.SaveFormRequest(this.form.value).subscribe((result) => {
  console.log('Result of saving Form request', result);
  });
  }

  GoBack(){
this._location.back();
  }

Accept(){
this.FormsService.Accepttentative({is_accepted:true,id:this.tentative_id}).subscribe(result=>{
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
    detail: 'Tentative updated',
  });
  window.location.reload();
})

  }

  Refuse(){
    this.FormsService.Accepttentative({is_accepted:false,id:this.tentative_id}).subscribe(result=>{
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
        detail: 'Tentative updated',
      });
      window.location.reload();
    })

  }
}
