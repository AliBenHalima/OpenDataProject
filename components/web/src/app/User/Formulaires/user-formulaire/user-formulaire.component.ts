import { environment } from './../../../../environments/environment';
import { FormsService } from './../../../Services/forms.service';
import { EvenementsService } from './../../../Services/evenements.service';
import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/Services/document.service';

@Component({
  selector: 'app-user-formulaire',
  templateUrl: './user-formulaire.component.html',
  styleUrls: ['./user-formulaire.component.scss']
})
export class UserFormulaireComponent implements OnInit {

  public Etablissement : any;
  public Documents : any;
  public formulaires: Array<any> =[];
  selectedForm :any
  constructor(private DocumentService: DocumentService,private FormsService : FormsService
    ) { }

  ngOnInit(): void {
    this.Etablissement  = JSON.parse(localStorage.getItem("Etablissement"));

    this.FormsService.UserGetAllFormulaires(this.Etablissement.id).subscribe((result) => {
      console.log('inputs resulys are', result);
      this.formulaires=result.formulaires;
      });
  }
  onTabOpen(sujet){
    console.log("Tab Event",sujet);
    this.Documents=this.Documents.filter(element=>element.sujetdocuments.id == sujet.id)
  }
  goToLink(){
    window.open("http://localhost:4200/user/formulaire/"+this.selectedForm.id, "_blank");
}

}
