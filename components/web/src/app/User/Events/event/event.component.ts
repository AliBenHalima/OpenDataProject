import { EvenementsService } from './../../../Services/evenements.service';
import { EtablissementService } from './../../../Services/etablissement.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  public events : Array<any> = [];
  constructor(public EvenementsService : EvenementsService) { }
  public Etablissement : any;


  ngOnInit(): void {


    this.Etablissement  = JSON.parse(localStorage.getItem("Etablissement"));

    this.EvenementsService.User_GetFullEvents(this.Etablissement.id).subscribe(result=>{
      this.events = result.event;
      console.log(this.events);

    })
  }

  SearchType(event){
    console.log(event);
  }

SearchEtablissement(event){}

public PassEtablissement(event: any):void {
  console.log("ee",event);
}
}
