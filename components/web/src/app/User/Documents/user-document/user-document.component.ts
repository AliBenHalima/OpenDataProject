import { EvenementsService } from './../../../Services/evenements.service';
import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/Services/document.service';

@Component({
  selector: 'app-user-document',
  templateUrl: './user-document.component.html',
  styleUrls: ['./user-document.component.scss']
})
export class UserDocumentComponent implements OnInit {

  public Etablissement : any;
  public Documents : any;
  public Sujets: Array<any> =[];
  constructor(private DocumentService: DocumentService) { }

  ngOnInit(): void {
    this.Etablissement  = JSON.parse(localStorage.getItem("Etablissement"));

    this.DocumentService.User_GetFullDocumentsByEtab(this.Etablissement.id).subscribe(result=>{
      this.Documents = result.documents;
      this.Sujets = result.Sujets;
    })
  }
  onTabOpen(sujet){
    console.log("Tab Event",sujet);
    this.Documents=this.Documents.filter(element=>element.sujetdocuments.id == sujet.id)
  }

}
