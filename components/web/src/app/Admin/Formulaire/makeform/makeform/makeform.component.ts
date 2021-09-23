import { EtablissementService } from './../../../../Services/etablissement.service';
import { QuestionService } from './../../../../Services/question.service';
import { Observable } from 'rxjs';
import { QuestionBase } from 'src/app/Utils/question-base';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-makeform',
  templateUrl: './makeform.component.html',
  styleUrls: ['./makeform.component.scss'],
  providers:  [QuestionService]
})
export class MakeformComponent implements OnInit {
  Localrole=JSON.parse(localStorage.getItem('isSuperAdmin'));
  Localetablissement_id = +localStorage.getItem('etablissement_id');
  id:Number;
  SelectedSearchEtab: any = null;
  etablissements=[];
  n=0

  questions$: Observable<QuestionBase<any>[]>;

  constructor(public service: QuestionService,public EtablissementService :EtablissementService) {
    this.questions$ = service.getQuestions();
   this.questions$.subscribe(res=>console.log("questions",res));
  }


  ngOnInit(): void {
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
    // this.service.pushQuestion();
    // console.log(this.n);
  }

}
