import { EtablissementService } from './../../Services/etablissement.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-etablissements',
  templateUrl: './etablissements.component.html',
  styleUrls: ['./etablissements.component.scss']
})
export class EtablissementsComponent implements OnInit {
  Etablissements=[];
  constructor(public etablissementService : EtablissementService) { }

  ngOnInit(): void {
}
}
