import { EtablissementService } from 'src/app/Services/etablissement.service';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/Services/question.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers:  [QuestionService]
})
export class EditComponent implements OnInit {
  Localrole=JSON.parse(localStorage.getItem('isSuperAdmin'));
  Localetablissement_id = +localStorage.getItem('etablissement_id');
  id:Number;
  SelectedSearchEtab: any = null;
  etablissements=[];
  n=0;
  formulaire_id=0;
  questions$;

  constructor(public service: QuestionService,public EtablissementService :EtablissementService,private _route :ActivatedRoute) {
    this.questions$ = service.getQuestions();
   this.questions$.subscribe(res=>console.log("questions",res));
  }


  ngOnInit(): void {
    this._route.params.subscribe(routeParams => {
      this.formulaire_id = routeParams.formulaire;
      })

    this.id = this.Localrole ? 0 :  this.Localetablissement_id;
    this.SelectedSearchEtab=this.Localrole ? null :  this.Localetablissement_id;
      this.GetEtablissements();
  }
  GetEtablissements(){
    this.EtablissementService.User_Get_Etablissement().subscribe(result=>{
      this.etablissements = result.etablissements;
    })
  }

  new(){

  }

}

