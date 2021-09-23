import { FormsService } from 'src/app/Services/forms.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-formulaire-details',
  templateUrl: './formulaire-details.component.html',
  styleUrls: ['./formulaire-details.component.scss']
})
export class FormulaireDetailsComponent implements OnInit {
public formulaire_id="";
public tentatives:any;
public formulaire:any;

  constructor(public FormsService : FormsService, private _route: ActivatedRoute,private confirmationService : ConfirmationService,private messageService : MessageService) { }

  ngOnInit(): void {
  this._route.params.subscribe(routeParams => {
      this.formulaire_id = routeParams.formulaire;
      })

  this.GetFormulaireFullData();
}

GetFormulaireFullData(){
  this.FormsService.GetFormulaireFullData(this.formulaire_id).subscribe((result)=>{
    console.log("result",result);
    this.tentatives = result.tentatives
    this.formulaire= result.formulaire
  })
}



Deletetentative(id){
  this.confirmationService.confirm({
    message: 'Are you sure that you want to Delete this tentative ?',
    accept: () => {
      this.FormsService.Deletetentative(id).subscribe((result) => {
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
          detail: 'Tentative Deleted',
        });
        this.GetFormulaireFullData();
      });
    },
  });
}


}
